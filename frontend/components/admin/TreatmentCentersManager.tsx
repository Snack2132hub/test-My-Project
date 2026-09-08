"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, RefreshCw, Building2, Upload } from "lucide-react";
import { CENTER_ICON_TYPES, type TreatmentCenter } from "@/lib/treatmentCentersData";

const ICON_LABELS: Record<string, string> = {
  "shield-alert": "โล่ฉุกเฉิน (อุบัติเหตุ)",
  "heart-pulse": "หัวใจเต้น (สูตินรีเวช)",
  stethoscope: "หูฟังแพทย์ (อายุรกรรม)",
  scissors: "กรรไกร (ศัลยกรรม)",
  smile: "รอยยิ้ม (ทันตกรรม)",
  baby: "เด็กทารก (กุมารเวช)",
  bone: "กระดูก (ออร์โธ)",
  activity: "คลื่นชีพจร (กายภาพ)",
  heart: "หัวใจ (ฟื้นฟู)",
  "file-text": "เอกสาร (หู คอ จมูก)",
  eye: "ดวงตา (จักษุ)",
  sparkles: "ประกาย (แผนไทย)",
};

const inputClass =
  "w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500";

const emptyForm: Omit<TreatmentCenter, "id"> = {
  slug: "",
  title_th: "",
  title_en: "",
  icon_type: "stethoscope",
  description: "",
  highlight_text: "",
  banners: [],
  services: [],
  facilities: [],
  hours_regular: "",
  hours_after: "",
  hours_emergency: "",
  contact_ext: "",
  doctor_department: "",
  display_order: 99,
};

function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <div className="space-y-2">
        {items.map((val, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={val}
              onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
              placeholder={placeholder}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-xs font-medium text-[#f97316] hover:text-orange-600 flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> เพิ่มรายการ
        </button>
      </div>
    </div>
  );
}

export default function TreatmentCentersManager() {
  const [items, setItems] = useState<TreatmentCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<TreatmentCenter, "id">>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pendingBannerIdx = useRef<number>(0);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/treatment-centers");
      const json = await res.json();
      if (json.ok) setItems(json.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetch("/api/treatment-centers")
      .then((r) => r.json())
      .then((json) => {
        if (json.ok) setItems(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditingId(null);
    const maxOrder = items.length ? Math.max(...items.map((i) => i.display_order)) + 1 : 1;
    setForm({ ...emptyForm, display_order: maxOrder });
    setShowModal(true);
  };

  const openEdit = (c: TreatmentCenter) => {
    setEditingId(c.id);
    const { id: _id, is_active: _a, ...rest } = c;
    void _id;
    void _a;
    setForm({ ...emptyForm, ...rest });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ต้องการลบศูนย์นี้ใช่หรือไม่?")) return;
    await fetch(`/api/treatment-centers/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleUpload = async (file: File) => {
    const idx = pendingBannerIdx.current;
    setUploadingIdx(idx);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) {
        setForm((prev) => ({
          ...prev,
          banners: prev.banners.map((b, j) => (j === idx ? json.url : b)),
        }));
      } else alert(json.message || "อัปโหลดไม่สำเร็จ");
    } catch {
      alert("เกิดข้อผิดพลาดในการอัปโหลด");
    }
    setUploadingIdx(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/treatment-centers/${editingId}` : "/api/treatment-centers";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          banners: form.banners.filter((b) => b.trim()),
          services: form.services.filter((s) => s.trim()),
          facilities: form.facilities.filter((f) => f.trim()),
        }),
      });
      const json = await res.json();
      if (json.ok) {
        setShowModal(false);
        fetchItems();
      } else alert(json.message || "เกิดข้อผิดพลาด");
    } catch {
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการศูนย์รักษาเฉพาะทาง</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {items.length} ศูนย์ (หน้า /patient-services)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchItems} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> เพิ่มศูนย์ใหม่
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
            ยังไม่มีศูนย์รักษา
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 w-12">ลำดับ</th>
                <th className="py-3 px-4">ชื่อศูนย์</th>
                <th className="py-3 px-4">slug</th>
                <th className="py-3 px-4 text-center">บริการ</th>
                <th className="py-3 px-4 text-center">แบนเนอร์</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((c) => (
                <tr key={c.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="py-3 px-4 text-center text-gray-400 text-xs">{c.display_order}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{c.title_th}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{c.slug}</td>
                  <td className="py-3 px-4 text-center text-xs">{c.services.length}</td>
                  <td className="py-3 px-4 text-center text-xs">{c.banners.length}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50">
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

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 my-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#f97316]" />
              {editingId ? "แก้ไขศูนย์รักษา" : "เพิ่มศูนย์รักษาใหม่"}
            </h3>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleUpload(f);
                e.target.value = "";
              }}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.slug}
                    disabled={!!editingId}
                    onChange={(e) => setForm({ ...form, slug: e.target.value.replace(/[^a-z0-9-]/g, "") })}
                    placeholder="เช่น emergency, obgyn"
                    className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-400`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ลำดับการแสดง</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: Number(e.target.value.replace(/\D/g, "")) || 1 })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ชื่อศูนย์ (ไทย) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.title_th}
                    onChange={(e) => setForm({ ...form, title_th: e.target.value })}
                    placeholder="เช่น ศูนย์อายุรกรรม"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อศูนย์ (อังกฤษ)</label>
                  <input
                    value={form.title_en}
                    onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                    placeholder="เช่น Internal Medicine Center"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ไอคอน</label>
                <select
                  value={form.icon_type}
                  onChange={(e) => setForm({ ...form, icon_type: e.target.value })}
                  className={`${inputClass} bg-white`}
                >
                  {CENTER_ICON_TYPES.map((v) => (
                    <option key={v} value={v}>
                      {ICON_LABELS[v] || v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">คำอธิบายศูนย์</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ข้อความไฮไลต์ (แสดงบนแบนเนอร์)</label>
                <input
                  value={form.highlight_text}
                  onChange={(e) => setForm({ ...form, highlight_text: e.target.value })}
                  className={inputClass}
                />
              </div>

              {/* Banners */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">แบนเนอร์ (รูปภาพ)</label>
                <div className="space-y-2">
                  {form.banners.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={b}
                        onChange={(e) =>
                          setForm({ ...form, banners: form.banners.map((v, j) => (j === i ? e.target.value : v)) })
                        }
                        placeholder="/img/... หรือ URL"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          pendingBannerIdx.current = i;
                          fileRef.current?.click();
                        }}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 shrink-0"
                        title="อัปโหลดรูป"
                      >
                        {uploadingIdx === i ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, banners: form.banners.filter((_, j) => j !== i) })}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, banners: [...form.banners, ""] })}
                    className="text-xs font-medium text-[#f97316] hover:text-orange-600 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> เพิ่มแบนเนอร์
                  </button>
                </div>
              </div>

              <StringListEditor
                label="ขอบเขตการให้บริการทางการแพทย์ (services)"
                items={form.services}
                onChange={(next) => setForm({ ...form, services: next })}
                placeholder="เช่น ตรวจรักษาโรคทั่วไปและโรคเรื้อรัง"
              />

              <StringListEditor
                label="เครื่องมือและสิ่งอำนวยความสะดวก"
                items={form.facilities}
                onChange={(next) => setForm({ ...form, facilities: next })}
                placeholder="เช่น เครื่องตรวจคลื่นไฟฟ้าหัวใจ EKG"
              />

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">เวลาทำการหลัก</label>
                <input
                  value={form.hours_regular}
                  onChange={(e) => setForm({ ...form, hours_regular: e.target.value })}
                  placeholder="เช่น จันทร์ - ศุกร์ : 08.00 - 16.00 น."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">คลินิกนอกเวลา (ถ้ามี)</label>
                <input
                  value={form.hours_after}
                  onChange={(e) => setForm({ ...form, hours_after: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ข้อความฉุกเฉิน (ถ้ามี)</label>
                <input
                  value={form.hours_emergency}
                  onChange={(e) => setForm({ ...form, hours_emergency: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">เบอร์ต่อ</label>
                  <input
                    value={form.contact_ext}
                    onChange={(e) => setForm({ ...form, contact_ext: e.target.value })}
                    placeholder="เช่น 301, 302"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">แผนกของแพทย์ (จับคู่กับตารางแพทย์)</label>
                  <input
                    value={form.doctor_department}
                    onChange={(e) => setForm({ ...form, doctor_department: e.target.value })}
                    placeholder="เช่น อายุรกรรม"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-sm font-medium"
                >
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
