"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, RefreshCw, ClipboardList } from "lucide-react";

interface RegStep {
  id: number;
  title: string;
  description: string;
  display_order: number;
}

const emptyForm = { title: "", description: "", display_order: 99 };

export default function PatientRegistrationManager() {
  const [items, setItems] = useState<RegStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/patient-registration");
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

  const openEdit = (item: RegStep) => {
    setEditingId(item.id);
    setFormData({ title: item.title, description: item.description || "", display_order: item.display_order });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) return;
    await fetch(`/api/patient-registration/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/patient-registration/${editingId}` : "/api/patient-registration";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
          <ClipboardList className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการลงทะเบียนผู้ป่วยใหม่</h2>
            <p className="text-xs text-gray-500 mt-0.5">ขั้นตอนและข้อมูลการลงทะเบียน — ทั้งหมด {items.length} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchItems} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มขั้นตอน
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">ยังไม่มีข้อมูลขั้นตอนการลงทะเบียน</div>
        ) : (
          items.map((item, idx) => (
            <div key={item.id} className="flex gap-4 items-start p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50/20 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#f97316] text-white text-sm font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขขั้นตอน" : "เพิ่มขั้นตอนใหม่"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">หัวข้อขั้นตอน <span className="text-red-500">*</span></label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น เตรียมเอกสารประจำตัว"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">รายละเอียด</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="รายละเอียดของขั้นตอนนี้..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ลำดับ</label>
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
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50">ยกเลิก</button>
                <button type="submit" disabled={isSubmitting}
                  className="px-5 py-2 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-sm font-medium shadow-xs">
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
