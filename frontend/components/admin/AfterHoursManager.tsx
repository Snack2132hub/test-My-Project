"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Clock } from "lucide-react";

interface Clinic {
  id: number;
  clinic_name: string;
  specialist: string;
  doctor_name: string;
  schedule: string;
  phone: string;
  display_order: number;
}

const emptyForm = { clinic_name: "", specialist: "", doctor_name: "", schedule: "", phone: "", display_order: 99 };

export default function AfterHoursManager() {
  const [items, setItems] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/after-hours-clinic");
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

  const openEdit = (item: Clinic) => {
    setEditingId(item.id);
    setFormData({ clinic_name: item.clinic_name, specialist: item.specialist || "", doctor_name: item.doctor_name || "", schedule: item.schedule || "", phone: item.phone || "", display_order: item.display_order });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) return;
    await fetch(`/api/after-hours-clinic/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/after-hours-clinic/${editingId}` : "/api/after-hours-clinic";
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

  const SPECIALTIES = [
    "อายุรกรรมทั่วไป",
    "อายุรกรรมระบบหัวใจและหลอดเลือด",
    "อายุรกรรมระบบทางเดินอาหาร",
    "อายุรกรรมต่อมไร้ท่อ",
    "ศัลยกรรมทั่วไป",
    "ศัลยกรรมกระดูกและข้อ (ออร์โธปิดิกส์)",
    "ศัลยกรรมระบบทางเดินปัสสาวะ",
    "กุมารเวชกรรม",
    "สูตินรีเวช",
    "จักษุวิทยา",
    "โสต ศอ นาสิก",
    "ผิวหนัง",
    "จิตเวช",
    "ทันตกรรม",
    "เวชกรรมฟื้นฟู",
    "รังสีวิทยา",
    "อื่นๆ",
  ];

  const field = (label: string, key: keyof typeof emptyForm, placeholder: string, required = false) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}{required && <span className="text-red-500"> *</span>}</label>
      <input value={formData[key] as string} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
        placeholder={placeholder} required={required}
        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการคลินิกพิเศษนอกเวลา</h2>
            <p className="text-xs text-gray-500 mt-0.5">ตารางคลินิกนอกเวลาราชการ — ทั้งหมด {items.length} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchItems} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มคลินิก
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">ยังไม่มีตารางคลินิกนอกเวลา</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">ชื่อคลินิก</th>
                <th className="py-3 px-4">สาขา/ความเชี่ยวชาญ</th>
                <th className="py-3 px-4">แพทย์</th>
                <th className="py-3 px-4">วัน-เวลา</th>
                <th className="py-3 px-4">โทรศัพท์</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-900">{item.clinic_name}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.specialist || "-"}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.doctor_name || "-"}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.schedule || "-"}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.phone || "-"}</td>
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
              <Clock className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขคลินิก" : "เพิ่มคลินิกใหม่"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {field("ชื่อคลินิก", "clinic_name", "เช่น คลินิกอายุรกรรมนอกเวลา", true)}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">สาขา/ความเชี่ยวชาญ</label>
                <select value={formData.specialist} onChange={e => setFormData({ ...formData, specialist: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                  <option value="">-- เลือกสาขา --</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {field("ชื่อแพทย์", "doctor_name", "เช่น นพ.สมชาย ใจดี")}
              {field("วัน-เวลา", "schedule", "เช่น จันทร์-ศุกร์ 17:00-20:00")}
              {field("โทรศัพท์", "phone", "เช่น 044-311856 ต่อ 123")}
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
