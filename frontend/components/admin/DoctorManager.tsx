"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Stethoscope, Upload, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const EXPERTISE_LEVELS = [
  "นายแพทย์เชี่ยวชาญ",
  "นายแพทย์ชำนาญการพิเศษ",
  "นายแพทย์ชำนาญการ",
  "แพทย์เชี่ยวชาญ",
  "แพทย์ชำนาญการพิเศษ",
  "แพทย์ชำนาญการ",
  "แพทย์ปฏิบัติการ",
];

const NAME_PREFIXES = [
  "นพ.", "พญ.",
  "ดร.นพ.", "ดร.พญ.",
  "ทพ.", "ทพญ.",
  "นาย", "นาง", "น.ส.", "ดร.",
];

function parseDrName(fullName: string): { prefix: string; firstname: string; lastname: string } {
  const name = fullName.trim();
  for (const p of NAME_PREFIXES) {
    if (name.startsWith(p)) {
      const rest = name.slice(p.length).trim();
      const parts = rest.split(/\s+/);
      return { prefix: p, firstname: parts[0] || "", lastname: parts.slice(1).join(" ") };
    }
  }
  const parts = name.split(/\s+/);
  return { prefix: "", firstname: parts[0] || "", lastname: parts.slice(1).join(" ") };
}

interface Doctor {
  dr_id: number;
  dr_name: string;
  dr_department: string;
  dr_record1: string;
  dr_record2: string;
  position1: string;
  dr_img: string;
  dr_check1: string;
  dr_check2: string;
}

const emptyForm = {
  dr_prefix: "", dr_firstname: "", dr_lastname: "",
  dr_department: "",
  dr_record1: "", dr_record2: "", dr_record3: "", dr_record4: "", dr_record5: "",
  dr_record6: "", dr_record7: "", dr_record8: "", dr_record9: "", dr_record10: "",
  educational_record1: "", educational_record2: "", educational_record3: "", educational_record4: "", educational_record5: "",
  educational_record6: "", educational_record7: "", educational_record8: "", educational_record9: "", educational_record10: "",
  position1: "", position2: "", position3: "", position4: "", position5: "",
  contribution1: "", contribution2: "", contribution3: "", contribution4: "", contribution5: "",
  contribution_link: "", contribution_file: "",
  dr_check1: "", dr_check2: "", dr_check3: "",
  dr_img: "",
};

type FormData = typeof emptyForm;

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{label}</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

function TextInput({ label, field, form, setForm, placeholder, required }: {
  label: string; field: keyof FormData; form: FormData;
  setForm: (f: FormData) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
        placeholder={placeholder} required={required}
        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500" />
    </div>
  );
}

const DEPARTMENTS = [
  "อายุรกรรมทั่วไป", "อายุรกรรมระบบหัวใจและหลอดเลือด", "อายุรกรรมระบบทางเดินอาหาร",
  "อายุรกรรมต่อมไร้ท่อ", "ศัลยกรรมทั่วไป", "ศัลยกรรมกระดูกและข้อ (ออร์โธปิดิกส์)",
  "ศัลยกรรมระบบทางเดินปัสสาวะ", "กุมารเวชกรรม", "สูติ-นรีเวชกรรม",
  "จักษุวิทยา", "โสต ศอ นาสิก", "ผิวหนัง", "จิตเวช", "ทันตกรรม",
  "ฉุกเฉินและอุบัติเหตุ", "เวชกรรมฟื้นฟู", "รังสีวิทยา", "อื่นๆ",
];

export default function DoctorManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterExpertise, setFilterExpertise] = useState("");
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetchingEdit, setIsFetchingEdit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPage(1); }, [filterExpertise]);
  useEffect(() => { fetchDoctors(); }, [page, filterExpertise]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const expertiseParam = filterExpertise ? `&expertise=${encodeURIComponent(filterExpertise)}` : "";
      const res = await fetch(`${API}/api/doctors?page=${page}&limit=${limit}${expertiseParam}`);
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

  const openEdit = async (d: Doctor) => {
    setEditingId(d.dr_id);
    setShowModal(true);
    setIsFetchingEdit(true);
    try {
      const res = await fetch(`${API}/api/doctors/${d.dr_id}`);
      const json = await res.json();
      if (json.ok && json.data) {
        const raw = json.data;
        const rec1 = raw.dr_record1 || "";
        const pos1 = raw.position1 || "";
        const isRec1Expertise = EXPERTISE_LEVELS.includes(rec1);
        const isPos1Expertise = EXPERTISE_LEVELS.includes(pos1);
        const expertiseLevel = isRec1Expertise ? rec1 : (isPos1Expertise ? pos1 : rec1);
        const certificate = isRec1Expertise ? (raw.dr_record2 || "") : (isPos1Expertise ? rec1 : (raw.dr_record2 || ""));
        const extraPos1 = isRec1Expertise ? pos1 : (isPos1Expertise ? "" : pos1);

        const parsed = parseDrName(raw.dr_name || "");
        setFormData({
          dr_prefix: parsed.prefix,
          dr_firstname: parsed.firstname,
          dr_lastname: parsed.lastname,
          dr_department: raw.dr_department || "",
          dr_record1: expertiseLevel,
          dr_record2: certificate,
          dr_record3: raw.dr_record3 || "",
          dr_record4: raw.dr_record4 || "",
          dr_record5: raw.dr_record5 || "",
          dr_record6: raw.dr_record6 || "",
          dr_record7: raw.dr_record7 || "",
          dr_record8: raw.dr_record8 || "",
          dr_record9: raw.dr_record9 || "",
          dr_record10: raw.dr_record10 || "",
          educational_record1: raw.educational_record1 || "",
          educational_record2: raw.educational_record2 || "",
          educational_record3: raw.educational_record3 || "",
          educational_record4: raw.educational_record4 || "",
          educational_record5: raw.educational_record5 || "",
          educational_record6: raw.educational_record6 || "",
          educational_record7: raw.educational_record7 || "",
          educational_record8: raw.educational_record8 || "",
          educational_record9: raw.educational_record9 || "",
          educational_record10: raw.educational_record10 || "",
          position1: extraPos1,
          position2: raw.position2 || "",
          position3: raw.position3 || "",
          position4: raw.position4 || "",
          position5: raw.position5 || "",
          contribution1: raw.contribution1 || "",
          contribution2: raw.contribution2 || "",
          contribution3: raw.contribution3 || "",
          contribution4: raw.contribution4 || "",
          contribution5: raw.contribution5 || "",
          contribution_link: raw.contribution_link || "",
          contribution_file: raw.contribution_file || "",
          dr_check1: raw.dr_check1 || "",
          dr_check2: raw.dr_check2 || "",
          dr_check3: raw.dr_check3 || "",
          dr_img: raw.dr_img || "",
        });
      }
    } catch { }
    setIsFetchingEdit(false);
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
      if (json.ok) setFormData(prev => ({ ...prev, dr_img: json.url }));
      else alert(json.message);
    } catch { alert("เกิดข้อผิดพลาดในการอัปโหลด"); }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dr_name = [formData.dr_prefix, formData.dr_firstname, formData.dr_lastname]
        .filter(Boolean).join(" ");
      const payload = { ...formData, dr_name };
      const url = editingId ? `${API}/api/doctors/${editingId}` : `${API}/api/doctors`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
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
          <button onClick={openAdd} className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มแพทย์ใหม่
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3 py-4 border-b border-gray-100">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">ระดับความเชี่ยวชาญ</label>
          <div className="relative">
            <select value={filterExpertise} onChange={e => setFilterExpertise(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-[200px]">
              <option value="">ทั้งหมด</option>
              {EXPERTISE_LEVELS.map(lv => <option key={lv} value={lv}>{lv}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {filterExpertise && (
          <div className="flex items-end">
            <button onClick={() => setFilterExpertise("")}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors">
              <X className="w-3.5 h-3.5" /> ล้างตัวกรอง
            </button>
          </div>
        )}
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
                <th className="py-3 px-4">ระดับ</th>
                <th className="py-3 px-4">ตารางออกตรวจ</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {doctors.map(d => (
                <tr key={d.dr_id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0 flex items-center justify-center">
                      {d.dr_img
                        ? <img src={d.dr_img.startsWith("/") ? d.dr_img : `/img/${d.dr_img}`} alt={d.dr_name} className="w-full h-full object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        : <Stethoscope className="w-5 h-5 text-gray-300" />
                      }
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{d.dr_name}</td>
                  <td className="py-3 px-4"><span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">{d.dr_department}</span></td>
                  <td className="py-3 px-4 text-xs text-gray-600 max-w-[160px] truncate">{d.dr_record1 || d.position1}</td>
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
              {doctors.length === 0 && !loading && (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400 text-sm">ไม่พบข้อมูลแพทย์</td></tr>
              )}
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 shrink-0">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#f97316]" />
                {editingId ? "แก้ไขข้อมูลแพทย์" : "เพิ่มแพทย์ใหม่"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6">
              {isFetchingEdit ? (
                <div className="py-16 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
              ) : (
                <form id="doctor-form" onSubmit={handleSubmit} className="space-y-4">

                  {/* ── ข้อมูลพื้นฐาน ── */}
                  <SectionHeader label="ข้อมูลพื้นฐาน" />
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">คำนำหน้า <span className="text-red-500">*</span></label>
                    <select required value={formData.dr_prefix} onChange={e => setFormData({ ...formData, dr_prefix: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                      <option value="">-- เลือกคำนำหน้า --</option>
                      {NAME_PREFIXES.map(p => <option key={p} value={p}>{p}</option>)}
                      {formData.dr_prefix && !NAME_PREFIXES.includes(formData.dr_prefix) && (
                        <option value={formData.dr_prefix}>{formData.dr_prefix}</option>
                      )}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อ <span className="text-red-500">*</span></label>
                      <input required value={formData.dr_firstname} onChange={e => setFormData({ ...formData, dr_firstname: e.target.value })}
                        placeholder="สมชาย" className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">นามสกุล <span className="text-red-500">*</span></label>
                      <input required value={formData.dr_lastname} onChange={e => setFormData({ ...formData, dr_lastname: e.target.value })}
                        placeholder="ใจดี" className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                  </div>
                  {(formData.dr_prefix || formData.dr_firstname || formData.dr_lastname) && (
                    <p className="text-xs text-gray-400 -mt-1">
                      ชื่อที่จะบันทึก: <span className="font-medium text-gray-600">
                        {[formData.dr_prefix, formData.dr_firstname, formData.dr_lastname].filter(Boolean).join(" ")}
                      </span>
                    </p>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">แผนก <span className="text-red-500">*</span></label>
                    <select required value={formData.dr_department} onChange={e => setFormData({ ...formData, dr_department: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                      <option value="">-- เลือกแผนก --</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  {/* ── ความเชี่ยวชาญและวุฒิบัตร ── */}
                  <SectionHeader label="ความเชี่ยวชาญและวุฒิบัตร" />
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">ระดับความเชี่ยวชาญ <span className="text-red-500">*</span></label>
                    <select required value={formData.dr_record1} onChange={e => setFormData({ ...formData, dr_record1: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                      <option value="">-- เลือกระดับความเชี่ยวชาญ --</option>
                      {EXPERTISE_LEVELS.map(lv => <option key={lv} value={lv}>{lv}</option>)}
                      {formData.dr_record1 && !EXPERTISE_LEVELS.includes(formData.dr_record1) && (
                        <option value={formData.dr_record1}>{formData.dr_record1}</option>
                      )}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["dr_record2","dr_record3","dr_record4","dr_record5","dr_record6","dr_record7","dr_record8","dr_record9","dr_record10"] as Array<keyof FormData>).map((f, i) => (
                      <TextInput key={f} label={`วุฒิบัตร / ความเชี่ยวชาญ ${i + 2}`} field={f} form={formData} setForm={setFormData} placeholder="เช่น วุฒิบัตรสาขา..." />
                    ))}
                  </div>

                  {/* ── ประวัติการศึกษา ── */}
                  <SectionHeader label="ประวัติการศึกษา" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["educational_record1","educational_record2","educational_record3","educational_record4","educational_record5","educational_record6","educational_record7","educational_record8","educational_record9","educational_record10"] as Array<keyof FormData>).map((f, i) => (
                      <TextInput key={f} label={`การศึกษา ${i + 1}`} field={f} form={formData} setForm={setFormData} placeholder="เช่น 2552-2558 แพทยศาสตรบัณฑิต ม.มหิดล" />
                    ))}
                  </div>

                  {/* ── ตำแหน่ง ── */}
                  <SectionHeader label="ตำแหน่งงาน / บริหาร" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["position1","position2","position3","position4","position5"] as Array<keyof FormData>).map((f, i) => (
                      <TextInput key={f} label={`ตำแหน่ง ${i + 1}`} field={f} form={formData} setForm={setFormData} placeholder="เช่น รองผู้อำนวยการ..." />
                    ))}
                  </div>

                  {/* ── ผลงานวิชาการ ── */}
                  <SectionHeader label="ผลงานวิชาการ" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["contribution1","contribution2","contribution3","contribution4","contribution5"] as Array<keyof FormData>).map((f, i) => (
                      <TextInput key={f} label={`ผลงาน ${i + 1}`} field={f} form={formData} setForm={setFormData} placeholder="เช่น ชื่อบทความ / งานวิจัย..." />
                    ))}
                  </div>
                  <TextInput label="ลิงก์ผลงาน (URL)" field="contribution_link" form={formData} setForm={setFormData} placeholder="https://..." />
                  <TextInput label="ไฟล์ผลงาน" field="contribution_file" form={formData} setForm={setFormData} placeholder="ชื่อไฟล์หรือ path" />

                  {/* ── ตารางออกตรวจ ── */}
                  <SectionHeader label="ตารางออกตรวจ" />
                  <TextInput label="ตารางออกตรวจ 1" field="dr_check1" form={formData} setForm={setFormData} placeholder="เช่น นรีเวช วันอังคาร 08.00-16.00 น." />
                  <TextInput label="ตารางออกตรวจ 2" field="dr_check2" form={formData} setForm={setFormData} placeholder="เช่น ฝากครรภ์ วันศุกร์ 08.00-16.00 น." />
                  <TextInput label="ตารางออกตรวจ 3" field="dr_check3" form={formData} setForm={setFormData} placeholder="เช่น OPD วันจันทร์ 13.00-16.00 น." />

                  {/* ── รูปภาพ ── */}
                  <SectionHeader label="รูปภาพแพทย์" />
                  {formData.dr_img && (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.dr_img.startsWith("/") ? formData.dr_img : `/img/${formData.dr_img}`}
                        alt="preview"
                        className="w-full h-full object-contain"
                      />
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
                    {isUploading
                      ? <p className="text-sm text-orange-500 font-medium">กำลังอัปโหลด...</p>
                      : (
                        <>
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">คลิกหรือลากไฟล์ภาพมาวางที่นี่</p>
                          <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP</p>
                        </>
                      )
                    }
                  </div>

                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-100 shrink-0">
              <button type="button" onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                ยกเลิก
              </button>
              <button type="submit" form="doctor-form" disabled={isSubmitting || isFetchingEdit}
                className="px-5 py-2 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-60">
                {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
