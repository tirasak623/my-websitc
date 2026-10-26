import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/common/Button";
import { products } from "@/data/products";
import type { PhotoReview } from "@/types";
import {
  addLocalPhotoReview,
  isPhotoFileWithinSizeLimit,
  isSupportedPhotoFile,
  readFileAsDataUrl
} from "@/utils/photoReviews";

interface PhotoReviewFormProps {
  onSubmitted: (review: PhotoReview) => void;
}

export function PhotoReviewForm({ onSubmitted }: PhotoReviewFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customerName, setCustomerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [productId, setProductId] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupportedPhotoFile(file)) {
      setError("รองรับเฉพาะไฟล์รูปภาพ JPG, PNG, WEBP หรือ GIF เท่านั้น");
      return;
    }
    if (!isPhotoFileWithinSizeLimit(file)) {
      setError("ไฟล์รูปภาพมีขนาดใหญ่เกินไป (ไม่เกิน 4MB)");
      return;
    }

    setError(null);
    const dataUrl = await readFileAsDataUrl(file);
    setPhotoDataUrl(dataUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!customerName.trim() || !reviewText.trim() || !photoDataUrl) {
      setError("กรุณากรอกชื่อ ข้อความรีวิว และแนบรูปภาพให้ครบถ้วน");
      return;
    }

    setSubmitting(true);
    const review: PhotoReview = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      customerName: customerName.trim(),
      reviewText: reviewText.trim(),
      photoUrl: photoDataUrl,
      productId: productId || null,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    addLocalPhotoReview(review);
    onSubmitted(review);

    setCustomerName("");
    setReviewText("");
    setProductId("");
    setPhotoDataUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-sm border border-cocoa/5 grid gap-4"
    >
      <h2 className="font-semibold text-charcoal text-lg">เขียนรีวิวพร้อมแนบรูปภาพของคุณ</h2>
      <p className="text-xs text-charcoal/50">
        รีวิวที่คุณส่งจะถูกบันทึกไว้ในเบราว์เซอร์นี้เท่านั้น (ยังไม่มีฐานข้อมูลส่วนกลาง)
        จึงยังไม่แสดงให้ลูกค้าคนอื่นเห็นในขณะนี้
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-charcoal mb-1.5">
            ชื่อของคุณ
          </label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="เช่น คุณสมหญิง"
            className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
          />
        </div>

        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-charcoal mb-1.5">
            สินค้าที่รีวิว (ไม่บังคับ)
          </label>
          <select
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40"
          >
            <option value="">ไม่ระบุสินค้า</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="reviewText" className="block text-sm font-medium text-charcoal mb-1.5">
          ข้อความรีวิว
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={3}
          placeholder="บอกเล่าความคิดเห็นของคุณเกี่ยวกับสินค้า..."
          className="w-full px-3 py-2.5 rounded-lg border border-cocoa/15 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-cocoa/40 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">รูปภาพของคุณ</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-cocoa/30 text-sm text-charcoal/70 cursor-pointer hover:bg-cocoa/5">
            <ImagePlus size={18} aria-hidden="true" />
            เลือกรูปภาพ
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {photoDataUrl && (
            <img
              src={photoDataUrl}
              alt="ตัวอย่างรูปที่เลือก"
              className="w-14 h-14 rounded-lg object-cover border border-cocoa/10"
            />
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={submitting} className="w-fit">
        ส่งรีวิว
      </Button>
    </form>
  );
}
