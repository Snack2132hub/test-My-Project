"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Stethoscope, Upload, X, ChevronLeft, ChevronRight } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Doctor {
  dr_id: number;
  dr_name: string;
  dr_department: string;
  dr_record1: string;
  position1: string;
  dr_img: string;
  dr_check1: string;
  dr_check2: string;
}

const emptyForm = {
  dr_name: "",
  dr_department: "",
  dr_record1: "",
  position1: "",
  dr_img: "",
  dr_check1: "",
  dr_check2: "",
};

export default function DoctorManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchDoctors(); }, [page]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/doctors?page=${page}&limit=${limit}`);
      const json = await res.json();
      if (json.ok) { setDoctors(json.data); setTotal(json.total); }
    } catch { }
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (d: Doctor) => {
    setEditingId(d.dr_id);
    setFormData({
      dr_name: d.dr_name,
      dr_department: d.dr_department,
      dr_record1: d.dr_record1 || "",
      position1: d.position1 || "",
      dr_img: d.dr_img || "",
      dr_check1: d.dr_check1 || "",
      dr_check2: d.dr_check2 || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบแพทย์รายนี้ใช่หรือไม่?")) return;
    await fetch(`${API}/api/doctors/${id}`, { method: "DELETE" });
    fetchDoctors();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setFormData((prev) => ({ ...prev, dr_img: json.url }));
      else alert(json.message);
    } catch { alert("เกิดข้อผิดพลาดในการอัปโหลด"); }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `${API}/api/doctors/${editingId}` : `${API}/api/doctors`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.ok) { setShowModal(false); fetchDoctors(); }
      else alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setIsSubmitting(false);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการข้อมูลแพทย์</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {total} คน</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchDoctors} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มแพทย์ใหม่
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">รูป</th>
                <th className="py-3 px-4">ชื่อแพทย์</th>
                <th className="py-3 px-4">แผนก</th>
                <th className="py-3 px-4">ความเชี่ยวชาญ</th>
                <th className="py-3 px-4">ตารางออกตรวจ</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {doctors.map((d) => (
                <tr key={d.dr_id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                      {d.dr_img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={d.dr_img.startsWith("/") ? d.dr_img : `/img/${d.dr_img}`}
                          alt={d.dr_name}
                          className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center text-gray-300 ${d.dr_img ? 'hidden' : ''}`}>
                        <Stethoscope className="w-5 h-5" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{d.dr_name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">{d.dr_department}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate">{d.dr_record1}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">
                    {d.dr_check1 && <div>{d.dr_check1}</div>}
                    {d.dr_check2 && <div>{d.dr_check2}</div>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(d.dr_id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขข้อมูลแพทย์" : "เพิ่มแพทย์ใหม่"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ชื่อ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                <input required value={formData.dr_name} onChange={e => setFormData({ ...formData, dr_name: e.target.value })}
                  placeholder="เช่น นพ.สมชาย ใจดี"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* แผนก */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">แผนก <span className="text-red-500">*</span></label>
                <select required value={formData.dr_department} onChange={e => setFormData({ ...formData, dr_department: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                  <option value="">-- เลือกแผนก --</option>
                  {["อายุรกรรมทั่วไป","อายุรกรรมระบบหัวใจและหลอดเลือด","อายุรกรรมระบบทางเดินอาหาร","อายุรกรรมต่อมไร้ท่อ","ศัลยกรรมทั่วไป","ศัลยกรรมกระดูกและข้อ (ออร์โธปิดิกส์)","ศัลยกรรมระบบทางเดินปัสสาวะ","กุมารเวชกรรม","สูติ-นรีเวชกรรม","จักษุวิทยา","โสต ศอ นาสิก","ผิวหนัง","จิตเวช","ทันตกรรม","ฉุกเฉินและอุบัติเหตุ","เวชกรรมฟื้นฟู","รังสีวิทยา","อื่นๆ"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* ความเชี่ยวชาญ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ความเชี่ยวชาญ / วุฒิบัตร</label>
                <input value={formData.dr_record1} onChange={e => setFormData({ ...formData, dr_record1: e.target.value })}
                  placeholder="เช่น วุฒิบัตรสาขาสูติศาสตร์-นรีเวชวิทยา"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* ตำแหน่ง */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ตำแหน่ง</label>
                <input value={formData.position1} onChange={e => setFormData({ ...formData, position1: e.target.value })}
                  placeholder="เช่น นายแพทย์ชำนาญการพิเศษ"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* ตารางออกตรวจ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ตารางออกตรวจ (1)</label>
                <input value={formData.dr_check1} onChange={e => setFormData({ ...formData, dr_check1: e.target.value })}
                  placeholder="เช่น นรีเวช วันอังคาร เวลา 08.00 - 16.00 น."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ตารางออกตรวจ (2)</label>
                <input value={formData.dr_check2} onChange={e => setFormData({ ...formData, dr_check2: e.target.value })}
                  placeholder="เช่น ฝากครรภ์ วันศุกร์ เวลา 08.00 - 16.00 น."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* รูปภาพ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">รูปภาพ</label>
                {formData.dr_img && (
                  <div className="relative mb-2 w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.dr_img.startsWith("/") ? formData.dr_img : `/img/${formData.dr_img}`} alt="preview" className="w-full h-full object-contain" />
                    <button type="button" onClick={() => setFormData({ ...formData, dr_img: "" })}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFileUpload(f); }}
                >
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
