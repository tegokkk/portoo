import { Award, FileText } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"
import PictureRailGallery, { type PictureRailItem } from "@/components/ui/picture-rail-gallery"
import { certificates } from "@/data/portfolio"

const frames = ["black", "white", "oak"] as const
const railItems: PictureRailItem[] = certificates.map((certificate, index) => ({
  id: certificate.slug,
  title: certificate.name,
  artist: certificate.issuer,
  year: certificate.issuedAt,
  image: certificate.preview,
  aspect: certificate.previewSize.width / certificate.previewSize.height,
  frame: frames[index % frames.length],
  mat: true,
  drop: [0.04, 0.12, -0.02, 0.16, 0.06, 0, 0.1][index] ?? 0,
  tag: String(index + 1).padStart(2, "0"),
  details: [certificate.recipient, ...(certificate.credentialId ? [certificate.credentialId] : [])],
}))

export function CertificateSection({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  return (
    <section id="certificates" className="section-shell certificate-section">
      <SectionReveal className="paper-sheet certificate-paper">
        <div className="certificate-gallery-heading">
          <p className="section-kicker">Credentials / Learning archive</p>
          <h2>Certificates<span>.</span></h2>
          <p lang="id">Koleksi pencatatan hak cipta, sertifikasi kursus, eksplorasi AI &amp; data, serta partisipasi forum teknologi.</p>
        </div>
        <div className="certificate-rail-wrap">
          <PictureRailGallery
            items={railItems}
            aria-label="Certificate gallery"
            caption="Geser galeri sertifikat atau klik bingkai untuk melihat dokumen dan verifikasi resmi."
            autoplay={false}
            onOpenChange={(index) => onOpenChange(index !== null)}
            labels={{ front: "Depan", back: "Belakang", close: "Tutup", open: "Klik untuk melihat detail" }}
            renderDetailActions={(_, index) => {
              const certificate = certificates[index]
              return (
                <>
                  <a className="secondary-button" href={certificate.file} target="_blank" rel="noopener noreferrer">
                    <FileText size={16} aria-hidden="true" /> Open PDF
                  </a>
                  {certificate.verifyUrl && (
                    <a className="primary-button" href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                      <Award size={16} aria-hidden="true" /> Verify
                    </a>
                  )}
                </>
              )
            }}
          />
        </div>
        <p className="certificate-gallery-note">{String(certificates.length).padStart(2, "0")} credentials <span>Select a certificate to view details and PDF</span></p>
      </SectionReveal>
    </section>
  )
}
