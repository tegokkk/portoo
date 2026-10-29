import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import fs from 'node:fs/promises'
import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:5174'
const endpoint = 'https://formspree.io/f/portfolio-test'
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5174', '--strictPort'], {
  stdio: 'ignore', env: { ...process.env, VITE_FORMSPREE_ENDPOINT: endpoint },
})
let browser
async function until(check, message, ms = 10000) {
  const end = Date.now() + ms
  while (Date.now() < end) { if (await check()) return; await delay(100) }
  throw new Error(message)
}
async function section(page, id) {
  await page.locator('#' + id).evaluate(el => el.scrollIntoView({block:'start', behavior:'instant'}))
  await page.waitForTimeout(650)
}
async function closeDialog(page, trigger) {
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  assert(await dialog.evaluate(el => el.contains(document.activeElement)), 'Initial focus in dialog')
  await page.keyboard.press('Shift+Tab')
  assert(await dialog.evaluate(el => el.contains(document.activeElement)), 'Focus trapped backwards')
  await page.keyboard.press('Tab')
  assert(await dialog.evaluate(el => el.contains(document.activeElement)), 'Focus trapped forwards')
  await page.keyboard.press('Escape')
  await dialog.waitFor({state:'detached'})
  assert(await trigger.evaluate(el => el === document.activeElement), 'Return focus to opener')
}
try {
  await until(async()=>{try {return (await fetch(baseUrl)).ok} catch {return false}}, 'Dev server unavailable',30000)
  browser = await chromium.launch()
  const context = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' })
  let postCount = 0
  let formMode = 'success'
  await context.route(endpoint, async route => {
    postCount++
    await delay(350)
    if (formMode === 'network') return route.abort('failed')
    await route.fulfill({status:formMode === 'success' ? 200 : 422,contentType:'application/json',body:JSON.stringify({ok:formMode==='success'})})
  })
  const page = await context.newPage()
  const errors = []
  const missingAssets = []
  page.on('response', response => { if (response.url().startsWith(baseUrl) && /\/(assets|icons)\//.test(response.url()) && response.status() >= 400) missingAssets.push(response.url()) })
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(baseUrl)
  await page.locator('[data-gp-ready]').waitFor()
  assert(await page.locator('.glyph-front').innerText().then(t=>/tego saputra/i.test(t)))
  await page.locator('[data-gp-enter]').focus(); await page.keyboard.press('Enter')
  await page.locator('#home h1').waitFor()
  for (const id of ['certificates','tech','portfolio','about']) assert.equal(await page.locator(`.hero-layer-tab[href="#${id}"]`).count(),1)

  const names = ['ABSENAPEL','CARIMAKAN','POINTER PHOTOBOOTH','DECORMOMENT.BDL']
  const repos = ['ABSENAPEL','CARIMAKAN','PHOTOBOOTH1','DECORMOMENT.BDL']
  for (let i=0;i<4;i++) {
    const picker = page.locator('.project-picker button').nth(i)
    await picker.click()
    assert.equal(await page.locator('.project-deck-copy h3').innerText(), names[i])
    assert.equal(await page.locator('.cd-card[data-top="1"] img').getAttribute('alt'),`Preview ${names[i]}`)
    assert.equal(await page.locator('.project-links a').last().getAttribute('href'),`https://github.com/tegokkk/${repos[i]}`)
    const trigger = page.locator('.project-links button')
    await trigger.click()
    assert((await page.locator('.modal h2').innerText()).includes(names[i]))
    const modal = page.getByRole('dialog')
    const bounds = await modal.boundingBox()
    const backgroundY = await page.evaluate(()=>scrollY)
    await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2)
    await page.mouse.wheel(0,600)
    await until(()=>modal.evaluate(el=>el.scrollTop>0),'Modal mouse wheel did not scroll')
    assert.equal(await page.evaluate(()=>scrollY),backgroundY,'Background stays locked')
    await modal.focus(); await page.keyboard.press('Home'); await page.keyboard.press('PageDown')
    await closeDialog(page, trigger)
  }
  await page.locator('.project-deck').focus()
  await page.keyboard.press('ArrowRight')
  await until(async()=>await page.locator('.project-deck-copy h3').innerText()==='ABSENAPEL','Deck keyboard navigation')
  const deck = await page.locator('.cd-card[data-top="1"]').boundingBox()
  await page.mouse.move(deck.x+deck.width*.25,deck.y+deck.height*.5)
  await page.mouse.down(); await page.mouse.move(deck.x+deck.width*.8,deck.y+deck.height*.5,{steps:10}); await page.mouse.up()
  await until(async()=>await page.locator('.project-deck-copy h3').innerText()==='CARIMAKAN','Deck drag')
  assert.equal(await page.locator('.cd-card[data-drag="1"]').count(),0,'Drag overlay cleared')

  const flip = page.locator('.lanyard-flip')
  await flip.click(); assert.equal(await flip.getAttribute('aria-pressed'),'true')
  await flip.focus(); await page.keyboard.press('Enter'); assert.equal(await flip.getAttribute('aria-pressed'),'false')
  const card=page.locator('.lanyard-card')
  await card.focus(); await page.keyboard.press('Space'); assert.equal(await card.getAttribute('aria-pressed'),'true')
  const cv=page.getByRole('button',{name:'Preview CV',exact:true})
  await cv.click(); assert.equal(await page.locator('.cv-frame').getAttribute('src'),'/assets/tego-saputra-cv.pdf'); await closeDialog(page,cv)

  await section(page,'certificates')
  const gallery=page.locator('.certificate-gallery-scroll')
  const cards=page.locator('.certificate-gallery-card')
  assert.equal(await cards.count(),7)
  for(let i=0;i<7;i++) {
    const trigger=cards.nth(i)
    await trigger.click()
    const pdf=await page.getByRole('link',{name:'Open PDF',exact:true}).getAttribute('href')
    const response=await context.request.get(baseUrl+pdf)
    assert.equal(response.status(),200)
    assert((await response.body()).subarray(0,5).toString()==='%PDF-')
    await closeDialog(page,trigger)
  }
  await gallery.evaluate(el=>el.scrollLeft=0)
  await page.getByRole('button',{name:'Next certificates',exact:true}).click()
  assert(await gallery.evaluate(el=>el.scrollLeft>0))
  await gallery.focus(); await page.keyboard.press('ArrowLeft')
  await gallery.evaluate(el=>el.scrollLeft=0)
  const gb=await gallery.boundingBox()
  await page.mouse.move(gb.x+220,gb.y+100); await page.mouse.down(); await page.mouse.move(gb.x+40,gb.y+100,{steps:8}); await page.mouse.up()
  assert(await gallery.evaluate(el=>el.scrollLeft>0),'Certificate mouse drag')
  await gallery.evaluate(el=>el.scrollLeft=el.scrollWidth)
  const end=await gallery.evaluate(el=>el.scrollLeft)
  await page.getByRole('button',{name:'Next certificates',exact:true}).click()
  assert.equal(await gallery.evaluate(el=>el.scrollLeft),end,'Finite certificate gallery')

  await section(page,'contact')
  await page.getByRole('button',{name:'Send message',exact:true}).click()
  assert.equal(postCount,0,'Invalid form must not send')
  for(const mode of ['success','server','network']) {
    formMode=mode
    await page.locator('[name=name]').fill('Portfolio test')
    await page.locator('[name=email]').fill('test@example.com')
    await page.locator('[name=message]').fill('Automated test intercepted locally. Never sent.')
    await page.getByRole('button',{name:'Send message',exact:true}).click()
    await page.getByRole('button',{name:'Sending',exact:true}).waitFor()
    await until(async()=> (await page.locator('.form-toast').count())>0,'Form status missing')
    assert((await page.locator('.form-toast').innerText()).includes(mode==='success'?'Message sent.':'Message not sent.'))
    const preparedEmail=page.getByRole('link',{name:'Open prepared email',exact:true})
    if(mode==='success') assert.equal(await preparedEmail.count(),0,'No email fallback after success')
    else assert((await preparedEmail.getAttribute('href')).startsWith('mailto:tegosaputra02@gmail.com?'),'Failed form offers prepared email')
  }
  assert.equal(postCount,3)
  await fs.mkdir('artifacts/audit',{recursive:true})
  const widths=[320,360,430,768,980,1024,1280,1440,2560]
  for(const width of widths) {
    await page.setViewportSize({width,height:width===1280?600:900})
    for(const id of ['home','about','portfolio','certificates','tech','contact']) {
      await section(page,id)
      const dims=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth])
      assert(dims[0]<=dims[1]+1,`Overflow ${id} at ${width}: ${dims}`)
      const headings=await page.locator(`#${id} h1,#${id} h2,#${id} h3`).evaluateAll(els=>els.map(el=>({text:el.textContent,width:el.clientWidth,scroll:el.scrollWidth})))
      assert(headings.every(h=>h.scroll<=h.width+1),`Heading clipping at ${width}: ${JSON.stringify(headings)}`)
    }
    if([320,430,1440].includes(width)) {
      for(const id of ['home','about','portfolio','certificates','tech','contact']) {
        await section(page,id)
        await page.locator('#'+id).screenshot({path:`artifacts/audit/${width}-${id}.png`})
      }
    }
    if(width<=980) {
      await page.getByRole('button',{name:/Toggle menu/}).click()
      await page.locator('.nav-mobile-overlay').getByRole('button',{name:'Contact',exact:true}).click()
      await page.locator('.nav-mobile-overlay').waitFor({state:'detached'})
      assert.equal(await page.locator('#main-content').evaluate(el=>el.inert),false)
    }
  }
  assert.deepEqual(errors,[],'Browser runtime errors')
  assert.deepEqual(missingAssets,[],'Missing served assets')
  console.log('PASS: 9 viewport widths; project selection/drag/keyboard; 7 PDFs; modal wheel/focus/Escape; CV; ID flip; finite gallery; mocked form validation/loading/success/server/network failures.')
} finally {
  if(browser) await browser.close()
  if(server.pid) {
    if(process.platform==='win32') spawnSync('taskkill',['/pid',String(server.pid),'/t','/f'],{stdio:'ignore'})
    else server.kill('SIGTERM')
  }
}

