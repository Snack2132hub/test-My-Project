"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, RefreshCw, ImageIcon, Upload, X, Eye, EyeOff } from "lucide-react";

interface Banner {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  show_content: boolean;
  display_order: number;
  is_active: boolean;
}

const emptyForm = {
  image_url: "",
  title: "",
  subtitle: "",
  description: "",
  button_text: "",
  show_content: false,
  display_order: 99,
  is_active: true,
};

export default function BannerManager() {
  const [items, setItems] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/banners");
      const json = await res.json();
      if (json.ok) setItems(json.data);
    } catch {}
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.display_order)) + 1 : 1;
    setFormData({ ...emptyForm, display_order: maxOrder });
    setShowModal(true);
  };

  const openEdit = (item: Banner) => {
    setEditingId(item.id);
    setFormData({
      image_url: item.image_url,
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
      button_text: item.button_text || "",
      show_content: item.show_content,
      display_order: item.display_order,
      is_active: item.is_active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบแบนเนอร์นี้ใช่หรือไม่?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    fetchBanners();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setFormData(prev => ({ ...prev, image_url: json.url }));
      else alert(json.message || "อัปโหลดไม่สำเร็จ");
    } catch { alert("เกิดข้อผิดพลาดในการอัปโหลด"); }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) return alert("กรุณาเลือกรูปภาพแบนเนอร์");
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/banners/${editingId}` : `/api/banners`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.ok) { setShowModal(false); fetchBanners(); }
      else alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการแบนเนอร์หน้าแรก</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {items.length} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchBanners} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มแบนเนอร์
          </button>
        </div>
      </div>

      {/* Banner List */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
            ยังไม่มีแบนเนอร์
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={item.id} className="flex gap-4 items-center p-3 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50/20 transition-colors">
              {/* Order badge */}
              <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">
                {item.display_order}
              </span>

              {/* Preview */}
              <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                {item.image_url ? (
                  <img src={item.image_url} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {item.title ? (
                  <p className="font-semibold text-gray-900 text-sm truncate">{item.title}</p>
                ) : (
                  <p className="text-gray-400 text-sm italic">ไม่มีข้อความ</p>
                )}
                {item.subtitle && <p className="text-xs text-gray-500 truncate mt-0.5">{item.subtitle}</p>}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${item.show_content ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                    {item.show_content ? <><Eye className="w-3 h-3" />แสดงข้อความ</> : <><EyeOff className="w-3 h-3" />รูปเต็ม</>}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.is_active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                    {item.is_active ? "แสดง" : "ซ่อน"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขแบนเนอร์" : "เพิ่มแบนเนอร์ใหม่"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* รูปภาพ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">รูปภาพแบนเนอร์ <span className="text-red-500">*</span></label>
                {formData.image_url && (
                  <div className="relative mb-2 w-full h-40 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={formData.image_url} alt="preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setFormData({ ...formData, image_url: "" })}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFileUpload(f); }}>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} />
                  {isUploading ? (
                    <p className="text-sm text-orange-500 font-medium">กำลังอัปโหลด...</p>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">คลิกหรือลากไฟล์ภาพมาวางที่นี่</p>
                      <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP (แนะนำ 1200×500px)</p>
                    </>
                  )}
                </div>
              </div>

              {/* แสดงข้อความ toggle */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <button type="button"
                  onClick={() => setFormData(p => ({ ...p, show_content: !p.show_content }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${formData.show_content ? "bg-[#f97316]" : "bg-gray-300"}`}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.show_content ? "translate-x-5" : ""}`} />
                </button>
                <div>
                  <p className="text-sm font-medium text-gray-700">แสดงข้อความบนแบนเนอร์</p>
                  <p className="text-xs text-gray-500">เปิดเพื่อแสดงชื่อ/คำบรรยาย/ปุ่ม บนรูปภาพ</p>
                </div>
              </div>

              {formData.show_content && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อหลัก (Title)</label>
                    <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="เช่น โรงพยาบาลปากช่องนานา"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อรอง (Subtitle)</label>
                    <input value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="เช่น Pakchongnana Hospital"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">คำบรรยาย</label>
                    <textarea rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="เช่น ร่วมใจ ใฝ่บริการ บริการดุจญาติมิตร"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">ข้อความปุ่ม</label>
                    <input value={formData.button_text} onChange={e => setFormData({ ...formData, button_text: e.target.value })}
                      placeholder="เช่น เกี่ยวกับเรา"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ลำดับการแสดง</label>
                  <div className="flex items-stretch rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                    <button type="button" onClick={() => setFormData({ ...formData, display_order: Math.max(1, formData.display_order - 1) })}
                      className="px-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-lg leading-none transition-colors border-r border-gray-200">−</button>
                    <input type="text" inputMode="numeric" value={formData.display_order}
                      onChange={e => setFormData({ ...formData, display_order: Number(e.target.value.replace(/\D/g, '')) || 1 })}
                      className="flex-1 px-3 py-2 text-sm text-gray-900 text-center outline-none min-w-0" />
                    <button type="button" onClick={() => setFormData({ ...formData, display_order: formData.display_order + 1 })}
                      className="px-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-lg leading-none transition-colors border-l border-gray-200">+</button>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                    <button type="button"
                      onClick={() => setFormData(p => ({ ...p, is_active: !p.is_active }))}
                      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${formData.is_active ? "bg-green-500" : "bg-gray-300"}`}>
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.is_active ? "translate-x-4" : ""}`} />
                    </button>
                    <span className="text-xs font-medium text-gray-700">{formData.is_active ? "แสดง" : "ซ่อน"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  ยกเลิก
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="px-5 py-2 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors shadow-xs">
                  {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
