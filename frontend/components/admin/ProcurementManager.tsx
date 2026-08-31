"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, RefreshCw, ClipboardList, Briefcase, ChevronLeft, ChevronRight, X } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const TABS = [
  { value: "procurement", label: "จัดซื้อจัดจ้าง", icon: ClipboardList },
  { value: "job", label: "สมัครงาน / รับสมัครบุคลากร", icon: Briefcase },
];

interface ProcurementItem {
  id: number;
  title: string;
  type: string;
  document_url: string;
  published_at: string;
  deadline_at: string | null;
}

const emptyForm = { title: "", type: "procurement", document_url: "", deadline_at: "" };

export default function ProcurementManager() {
  const [items, setItems] = useState<ProcurementItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("procurement");
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setPage(1); }, [activeTab]);
  useEffect(() => { fetchItems(); }, [page, activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/procurement?type=${activeTab}&page=${page}&limit=${limit}`);
      const json = await res.json();
      if (json.ok) { setItems(json.data); setTotal(json.total); }
    } catch { }
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, type: activeTab });
    setShowModal(true);
  };

  const openEdit = (item: ProcurementItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      type: item.type,
      document_url: item.document_url || "",
      deadline_at: item.deadline_at ? item.deadline_at.slice(0, 10) : "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) return;
    await fetch(`${API}/api/procurement/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `${API}/api/procurement/${editingId}` : `${API}/api/procurement`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, deadline_at: formData.deadline_at || null }),
      });
      const json = await res.json();
      if (json.ok) { setShowModal(false); fetchItems(); }
      else alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setIsSubmitting(false);
  };

  const totalPages = Math.ceil(total / limit);
  const ActiveIcon = TABS.find(t => t.value === activeTab)?.icon || ClipboardList;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ActiveIcon className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">ข่าวจัดซื้อจัดจ้าง & สมัครงาน</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {total} รายการ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchItems} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มรายการใหม่
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 my-5 p-1 bg-gray-100/80 rounded-xl">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.value} onClick={() => setActiveTab(tab.value)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.value ? "bg-white text-[#f97316] shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}>
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
            ยังไม่มีรายการในหมวดนี้
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">หัวข้อ</th>
                <th className="py-3 px-4">เอกสาร/ลิงก์</th>
                <th className="py-3 px-4">วันที่ประกาศ</th>
                <th className="py-3 px-4">วันปิดรับ</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-900 max-w-xs">
                    <div className="truncate">{item.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    {item.document_url ? (
                      <a href={item.document_url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline truncate block max-w-[160px]">
                        ดูเอกสาร
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500">
                    {item.published_at ? new Date(item.published_at).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" }) : "-"}
                  </td>
                  <td className="py-3 px-4 text-xs">
                    {item.deadline_at ? (
                      <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 font-medium">
                        {new Date(item.deadline_at).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <ActiveIcon className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ประเภท */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ประเภท <span className="text-red-500">*</span></label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                  {TABS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              {/* หัวข้อ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">หัวข้อ <span className="text-red-500">*</span></label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder={formData.type === "job" ? "เช่น รับสมัครพยาบาลวิชาชีพ จำนวน 3 อัตรา" : "เช่น ประกาศจัดซื้อครุภัณฑ์การแพทย์"}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* เอกสาร/ลิงก์ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ลิงก์เอกสาร / URL (ถ้ามี)</label>
                <input value={formData.document_url} onChange={e => setFormData({ ...formData, document_url: e.target.value })}
                  placeholder="https://... หรือ /uploads/file.pdf"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* วันปิดรับ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">วันปิดรับสมัคร / วันสิ้นสุด</label>
                <input type="date" value={formData.deadline_at} onChange={e => setFormData({ ...formData, deadline_at: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                {formData.deadline_at && (
                  <button type="button" onClick={() => setFormData({ ...formData, deadline_at: "" })}
                    className="mt-1 flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" /> ล้างวันที่
                  </button>
                )}
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
