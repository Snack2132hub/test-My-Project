"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Users, ImageIcon, Upload, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Executive {
  id: number;
  name: string;
  position: string;
  department: string;
  image_url: string;
  display_order: number;
}

const emptyExec: Omit<Executive, "id"> = {
  name: "",
  position: "",
  department: "โรงพยาบาลปากช่องนานา",
  image_url: "",
  display_order: 99,
};

export default function AboutManager({ initialTab = "executives" }: { initialTab?: string }) {
  const activeTab = initialTab;

  // ── Executives state ──
  const [execs, setExecs] = useState<Executive[]>([]);
  const [execLoading, setExecLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyExec });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const execFileRef = useRef<HTMLInputElement>(null);

  // ── Org chart state ──
  const [orgUrl, setOrgUrl] = useState("");
  const [orgLoading, setOrgLoading] = useState(true);
  const [orgSaving, setOrgSaving] = useState(false);
  const [orgUploading, setOrgUploading] = useState(false);
  const orgFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchExecs(); fetchOrgChart(); }, []);

  // ── Executives ──
  const fetchExecs = async () => {
    setExecLoading(true);
    try {
      const res = await fetch("/api/executives");
      const json = await res.json();
      if (json.ok) setExecs(json.data);
    } catch { }
    setExecLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    const maxOrder = execs.length > 0 ? Math.max(...execs.map(e => e.display_order)) + 1 : 1;
    setForm({ ...emptyExec, display_order: maxOrder });
    setShowModal(true);
  };

  const openEdit = (exec: Executive) => {
    setEditingId(exec.id);
    setForm({ name: exec.name, position: exec.position, department: exec.department, image_url: exec.image_url, display_order: exec.display_order });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบผู้บริหารคนนี้ใช่หรือไม่?")) return;
    await fetch(`/api/executives/${id}`, { method: "DELETE" });
    fetchExecs();
  };

  const handleExecImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setForm(prev => ({ ...prev, image_url: json.url }));
      else alert(json.message);
    } catch { alert("เกิดข้อผิดพลาดในการอัปโหลด"); }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/executives/${editingId}` : `/api/executives`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.ok) { setShowModal(false); fetchExecs(); }
      else alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setIsSubmitting(false);
  };

  // ── Org chart ──
  const fetchOrgChart = async () => {
    setOrgLoading(true);
    try {
      const res = await fetch("/api/org-chart");
      const json = await res.json();
      if (json.ok) setOrgUrl(json.image_url || "");
    } catch { }
    setOrgLoading(false);
  };

  const handleOrgUpload = async (file: File) => {
    setOrgUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setOrgUrl(json.url);
      else alert(json.message);
    } catch { alert("เกิดข้อผิดพลาดในการอัปโหลด"); }
    setOrgUploading(false);
  };

  const handleOrgSave = async () => {
    setOrgSaving(true);
    try {
      const res = await fetch("/api/org-chart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: orgUrl }),
      });
      const json = await res.json();
      if (!json.ok) alert(json.message || "เกิดข้อผิดพลาด");
    } catch { alert("เกิดข้อผิดพลาดในการบันทึก"); }
    setOrgSaving(false);
  };

  const pagedExecs = execs.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(execs.length / pageSize);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {activeTab === "executives"
            ? <Users className="w-5 h-5 text-[#f97316]" />
            : <ImageIcon className="w-5 h-5 text-[#f97316]" />}
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {activeTab === "executives" ? "ผู้บริหารโรงพยาบาล" : "โครงสร้างองค์กร"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeTab === "executives" ? `ทั้งหมด ${execs.length} คน` : "อัพโหลดรูปโครงสร้างองค์กร"}
            </p>
          </div>
        </div>
        {activeTab === "executives" && (
          <div className="flex items-center gap-3">
            <button onClick={fetchExecs} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <RefreshCw className={`w-4 h-4 ${execLoading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> เพิ่มผู้บริหาร
            </button>
          </div>
        )}
      </div>


      {/* ── Executives Tab ── */}
      {activeTab === "executives" && (
        <>
          {execLoading ? (
            <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
          ) : pagedExecs.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
              ยังไม่มีข้อมูลผู้บริหาร — กดเพิ่มผู้บริหารเพื่อเริ่มต้น
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pagedExecs.map(exec => (
                <div key={exec.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center relative group">
                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(exec)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center shadow-xs">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(exec.id)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-red-600 hover:bg-red-50 flex items-center justify-center shadow-xs">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                    {exec.image_url ? (
                      <img src={exec.image_url} alt={exec.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-xs font-bold">{exec.position.slice(0, 2)}</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">
                    {exec.name || <span className="text-gray-400 italic">ยังไม่ระบุชื่อ</span>}
                  </p>
                  <p className="text-xs text-[#f97316] font-medium mt-1 leading-tight">{exec.position}</p>
                  {exec.department && <p className="text-xs text-gray-400 mt-0.5 truncate">{exec.department}</p>}
                </div>
              ))}
            </div>
          )}

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
        </>
      )}

      {/* ── Org Chart Tab ── */}
      {activeTab === "org-chart" && (
        <div className="space-y-6">
          {orgLoading ? (
            <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลด...</div>
          ) : (
            <>
              {/* Preview */}
              {orgUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={orgUrl} alt="โครงสร้างองค์กร" className="w-full h-auto max-h-[500px] object-contain mx-auto block" />
                  <button onClick={() => setOrgUrl("")}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-xl py-16 text-center text-gray-400 bg-gray-50">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">ยังไม่มีรูปโครงสร้างองค์กร</p>
                </div>
              )}

              {/* Upload zone */}
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">อัพโหลดรูปใหม่</p>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer"
                  onClick={() => orgFileRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleOrgUpload(f); }}>
                  <input ref={orgFileRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleOrgUpload(f); }} />
                  {orgUploading ? (
                    <p className="text-sm text-orange-500 font-medium">กำลังอัปโหลด...</p>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">คลิกหรือลากไฟล์ภาพมาวางที่นี่</p>
                      <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP — แนะนำแนวนอน</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={handleOrgSave} disabled={orgSaving || !orgUrl}
                  className="px-6 py-2.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors shadow-xs disabled:opacity-40">
                  {orgSaving ? "กำลังบันทึก..." : "บันทึกโครงสร้างองค์กร"}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Executive Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขข้อมูลผู้บริหาร" : "เพิ่มผู้บริหาร"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* รูปภาพ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">รูปภาพ</label>
                {form.image_url && (
                  <div className="relative mb-2 w-24 h-24 mx-auto rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                    <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setForm(prev => ({ ...prev, image_url: "" }))}
                      className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer"
                  onClick={() => execFileRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleExecImageUpload(f); }}>
                  <input ref={execFileRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleExecImageUpload(f); }} />
                  {isUploading ? (
                    <p className="text-xs text-orange-500">กำลังอัปโหลด...</p>
                  ) : (
                    <p className="text-xs text-gray-400"><Upload className="w-4 h-4 inline mr-1" />คลิกหรือลากรูปมาวาง</p>
                  )}
                </div>
              </div>

              {/* ชื่อ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="เช่น นพ.สมชาย ใจดี"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              {/* ตำแหน่ง */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ตำแหน่ง <span className="text-red-500">*</span></label>
                <select required value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900">
                  <option value="">-- เลือกตำแหน่ง --</option>
                  {["ผู้อำนวยการโรงพยาบาล","รองผู้อำนวยการโรงพยาบาล","ผู้ช่วยผู้อำนวยการโรงพยาบาล","หัวหน้ากลุ่มงานเวชกรรม","หัวหน้ากลุ่มงานการพยาบาล","หัวหน้ากลุ่มงานทันตกรรม","หัวหน้ากลุ่มงานเภสัชกรรม","หัวหน้ากลุ่มงานรังสีวิทยา","หัวหน้ากลุ่มงานชันสูตร","หัวหน้ากลุ่มงานสุขภาพจิต","หัวหน้ากลุ่มงานเวชกรรมสังคม","หัวหน้ากลุ่มงานบริหารงานทั่วไป","นายแพทย์เชี่ยวชาญ","นายแพทย์ชำนาญการพิเศษ","นายแพทย์ชำนาญการ","อื่นๆ"].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* สังกัด */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">สังกัด / หน่วยงาน</label>
                <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900">
                  {["โรงพยาบาลปากช่องนานา","กลุ่มงานเวชกรรม","กลุ่มงานการพยาบาล","กลุ่มงานทันตกรรม","กลุ่มงานเภสัชกรรม","กลุ่มงานรังสีวิทยา","กลุ่มงานชันสูตร","กลุ่มงานสุขภาพจิต","กลุ่มงานเวชกรรมสังคม","กลุ่มงานบริหารงานทั่วไป"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* ลำดับ */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ลำดับการแสดง</label>
                <div className="flex items-stretch rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <button type="button" onClick={() => setForm({ ...form, display_order: Math.max(1, form.display_order - 1) })}
                    className="px-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-lg leading-none transition-colors border-r border-gray-200">−</button>
                  <input type="text" inputMode="numeric" value={form.display_order}
                    onChange={e => setForm({ ...form, display_order: Number(e.target.value.replace(/\D/g, '')) || 1 })}
                    className="flex-1 px-3 py-2 text-sm text-gray-900 text-center outline-none min-w-0" />
                  <button type="button" onClick={() => setForm({ ...form, display_order: form.display_order + 1 })}
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
