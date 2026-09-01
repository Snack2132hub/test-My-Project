"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Upload, X, AlertTriangle, Stethoscope, Scissors } from "lucide-react";

interface DeptItem {
  id: number;
  dept: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

type DeptKey = "emergency" | "internal" | "surgery";

const DEPT_CONFIG: Record<DeptKey, { label: string; icon: React.ElementType }> = {
  emergency: { label: "ศูนย์อุบัติเหตุ-ฉุกเฉิน", icon: AlertTriangle },
  internal:  { label: "ศูนย์อายุรกรรม", icon: Stethoscope },
  surgery:   { label: "ศูนย์ศัลยกรรม", icon: Scissors },
};

const emptyForm = { title: "", description: "", image_url: "", display_order: 99 };

export default function DepartmentManager({ initialDept = "emergency" }: { initialDept?: DeptKey }) {
  const dept = initialDept;
  const { label: deptLabel, icon: DeptIcon } = DEPT_CONFIG[dept];
  const [items, setItems] = useState<DeptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchItems(); }, [dept]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/departments?dept=${dept}`);
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

  const openEdit = (item: DeptItem) => {
    setEditingId(item.id);
    setFormData({ title: item.title, description: item.description || "", image_url: item.image_url || "", display_order: item.display_order });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) return;
    await fetch(`/api/departments/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setFormData(p => ({ ...p, image_url: json.url }));
      else alert(json.message);
    } catch { alert("เกิดข้อผิดพลาดในการอัปโหลด"); }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/departments/${editingId}` : `/api/departments`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, dept }),
      });
      const json = await res.json();
      if (json.ok) { setShowModal(false); fetchItems(); }
      else alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <DeptIcon className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการ{deptLabel}</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {items.length} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchItems} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มรายการ
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">ยังไม่มีรายการ</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-12">ลำดับ</th>
                <th className="py-3 px-4">รูปภาพ</th>
                <th className="py-3 px-4">หัวข้อ</th>
                <th className="py-3 px-4">รายละเอียด</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4 text-center text-gray-400 text-xs">{item.display_order}</td>
                  <td className="py-3 px-4">
                    <div className="w-14 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-300"><DeptIcon className="w-4 h-4" /></div>}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{item.title}</td>
                  <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">{item.description || "-"}</td>
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

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <DeptIcon className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">หัวข้อ <span className="text-red-500">*</span></label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น บริการผู้ป่วยฉุกเฉิน 24 ชั่วโมง"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">รายละเอียด</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="รายละเอียดบริการหรือข้อมูลเพิ่มเติม"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">รูปภาพ</label>
                {formData.image_url && (
                  <div className="relative mb-2 w-full h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={formData.image_url} alt="preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setFormData({ ...formData, image_url: "" })}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70">
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
                  {isUploading ? <p className="text-sm text-orange-500">กำลังอัปโหลด...</p>
                    : <><Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" /><p className="text-xs text-gray-500">คลิกหรือลากไฟล์มาวาง</p></>}
                </div>
              </div>
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
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">ยกเลิก</button>
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
