"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Building2, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Center {
  id: number;
  title: string;
  iconType: string;
  href: string;
  type: string;
  display_order: number;
}

export default function CentersManager({ initialTab = "specialized" }: { initialTab?: string }) {
  const activeTab = initialTab;
  const [items, setItems] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", iconType: "stethoscope", href: "", type: activeTab, display_order: 99 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => { fetchCenters(); }, [activeTab]);

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/centers?type=${activeTab}`);
      const json = await res.json();
      if (json.ok) setItems(json.data);
    } catch { }
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.display_order)) + 1 : 1;
    setFormData({ title: "", iconType: "stethoscope", href: "", type: activeTab, display_order: maxOrder });
    setShowModal(true);
  };

  const openEdit = (item: Center) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      iconType: item.iconType || "stethoscope",
      href: item.href || "",
      type: item.type,
      display_order: item.display_order,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) return;
    await fetch(`/api/centers/${id}`, { method: "DELETE" });
    fetchCenters();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/centers/${editingId}` : `/api/centers`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.ok) { setShowModal(false); fetchCenters(); }
      else alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setIsSubmitting(false);
  };

  const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(items.length / pageSize);
  const tabTitle = activeTab === "special" ? "ศูนย์รักษาพิเศษ" : "ศูนย์รักษาเฉพาะทาง";
  const ActiveTabIcon = activeTab === "special" ? Star : Building2;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ActiveTabIcon className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการ{tabTitle}</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {items.length} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchCenters} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มศูนย์ใหม่
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : pagedItems.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
            ยังไม่มีรายการในหมวดนี้
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-12">ลำดับ</th>
                <th className="py-3 px-4">ชื่อศูนย์</th>
                <th className="py-3 px-4">ลิงก์</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagedItems.map(item => (
                <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4 text-center text-gray-400 text-xs">{item.display_order}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{item.title}</td>
                  <td className="py-3 px-4 text-xs text-blue-600 max-w-[200px] truncate">{item.href || "-"}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <ActiveTabIcon className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขศูนย์การรักษา" : "เพิ่มศูนย์การรักษาใหม่"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ชื่อศูนย์ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อศูนย์ <span className="text-red-500">*</span></label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น ศูนย์สุขภาพสตรี, คลินิกเบาหวาน"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* ลิงก์ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ลิงก์ (href)</label>
                <input value={formData.href} onChange={e => setFormData({ ...formData, href: e.target.value })}
                  placeholder="เช่น /patient-services?dept=women"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* ลำดับ */}
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
