"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Bell, Upload, X, ChevronLeft, ChevronRight } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const CATEGORIES = [
  { value: "pr_news", label: "ข่าวประชาสัมพันธ์" },
  { value: "activity", label: "กิจกรรม" },
  { value: "after_hours", label: "คลินิกพิเศษนอกเวลา" },
];

interface NewsItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  content: string;
  published_at: string;
  is_active: number;
}

const emptyForm = { title: "", category: "pr_news", image_url: "", content: "" };

export default function NewsManager() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPage(1); }, [activeCategory]);
  useEffect(() => { fetchNews(); }, [page, activeCategory]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const cat = activeCategory !== "all" ? `&category=${activeCategory}` : "";
      const res = await fetch(`${API}/api/news?page=${page}&limit=${limit}${cat}`);
      const json = await res.json();
      if (json.ok) { setItems(json.data); setTotal(json.total); }
    } catch { }
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, category: activeCategory !== "all" ? activeCategory : "pr_news" });
    setShowModal(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormData({ title: item.title, category: item.category, image_url: item.image_url || "", content: item.content || "" });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบข่าวนี้ใช่หรือไม่?")) return;
    await fetch(`${API}/api/news/${id}`, { method: "DELETE" });
    fetchNews();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setFormData(prev => ({ ...prev, image_url: json.url }));
      else alert(json.message);
    } catch { alert("เกิดข้อผิดพลาดในการอัปโหลด"); }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `${API}/api/news/${editingId}` : `${API}/api/news`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.ok) { setShowModal(false); fetchNews(); }
      else alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setIsSubmitting(false);
  };

  const getCategoryLabel = (val: string) => CATEGORIES.find(c => c.value === val)?.label || val;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">ข่าวสารและกิจกรรม</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {total} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchNews} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มข่าวใหม่
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 my-5 p-1 bg-gray-100/80 rounded-xl">
        {[{ value: "all", label: "ทั้งหมด" }, ...CATEGORIES].map(cat => (
          <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === cat.value ? "bg-white text-[#f97316] shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
            ยังไม่มีข่าวในหมวดนี้
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">รูป</th>
                <th className="py-3 px-4">หัวข้อ</th>
                <th className="py-3 px-4">หมวดหมู่</th>
                <th className="py-3 px-4">วันที่</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-14 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-300"><Bell className="w-4 h-4" /></div>
                      }
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900 max-w-xs">
                    <div className="truncate">{item.title}</div>
                    {item.content && <div className="text-xs text-gray-400 font-normal truncate mt-0.5">{item.content}</div>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700">
                      {getCategoryLabel(item.category)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500">
                    {item.published_at ? new Date(item.published_at).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" }) : "-"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-100">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขข่าว" : "เพิ่มข่าวใหม่"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* หัวข้อ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">หัวข้อข่าว <span className="text-red-500">*</span></label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น โรงพยาบาลปากช่องนานาจัดกิจกรรม..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* หมวดหมู่ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">หมวดหมู่ <span className="text-red-500">*</span></label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              {/* เนื้อหา */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">เนื้อหา (ถ้ามี)</label>
                <textarea rows={3} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })}
                  placeholder="รายละเอียดข่าว..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* รูปภาพ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">รูปภาพ</label>
                {formData.image_url && (
                  <div className="relative mb-2 w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={formData.image_url} alt="preview" className="w-full h-full object-contain" />
                    <button type="button" onClick={() => setFormData({ ...formData, image_url: "" })}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
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
                      <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP</p>
                    </>
                  )}
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
