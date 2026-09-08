"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  HeartPulse,
  Syringe,
  Megaphone,
  Upload,
  X,
} from "lucide-react";

interface Item {
  id: number;
  title: string;
  date?: string;
  category?: string;
  price?: string;
  image: string;
  description?: string;
  pinned?: boolean;
}

export default function HealthCheckupManager({ initialTab = "announcements" }: { initialTab?: "announcements" | "checkup" | "vaccines" }) {
  const activeTab = initialTab;
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "ข่าวสาร",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const getApiEndpoint = () => {
    if (activeTab === "checkup") return "/api/health-checkup/checkup-programs";
    if (activeTab === "vaccines") return "/api/health-checkup/vaccine-programs";
    return "/api/health-checkup/announcements";
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(getApiEndpoint());
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setItems(json.data);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      date: "",
      category: activeTab === "vaccines" ? "วัคซีนทั่วไป" : "ข่าวสาร",
      price: "",
      image: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (item: Item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      date: item.date || "",
      category: item.category || "ข่าวสาร",
      price: item.price || "",
      image: item.image,
      description: item.description || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) return;
    try {
      const res = await fetch(`${getApiEndpoint()}?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.ok) {
        fetchData();
      } else {
        alert(json.message || "เกิดข้อผิดพลาดในการลบ");
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) {
        setFormData((prev) => ({ ...prev, image: json.url }));
      } else {
        alert(json.message || "อัปโหลดไม่สำเร็จ");
      }
    } catch {
      alert("เกิดข้อผิดพลาดในการอัปโหลด");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        date: activeTab === "announcements"
          ? new Date().toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })
          : formData.date,
      };
      const res = await fetch(getApiEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) {
        setShowModal(false);
        fetchData();
      } else {
        alert(json.message || "เกิดข้อผิดพลาดในการบันทึก");
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabConfig = {
    announcements: { label: "ข่าวสารและประกาศ", Icon: Megaphone },
    checkup: { label: "โปรแกรมตรวจสุขภาพ", Icon: HeartPulse },
    vaccines: { label: "โปรแกรมฉีดวัคซีน", Icon: Syringe },
  };
  const { label: tabLabel, Icon: TabIcon } = tabConfig[activeTab];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <TabIcon className="w-5 h-5 text-[#f97316]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">จัดการ{tabLabel}</h2>
            <p className="text-xs text-gray-500 mt-0.5">ทั้งหมด {items.length} รายการ</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#f97316] hover:bg-orange-600 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มข้อมูลใหม่</span>
          </button>
        </div>
      </div>

      {/* Items List Table */}
      <div className="mt-4">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            กำลังโหลดข้อมูล...
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
            ยังไม่มีรายการในหมวดหมู่นี้
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">รูปภาพ</th>
                  <th className="py-3 px-4">ชื่อรายการ</th>
                  {activeTab === "vaccines" && <th className="py-3 px-4">หมวดหมู่</th>}
                  {(activeTab === "checkup" || activeTab === "vaccines") && (
                    <th className="py-3 px-4">ราคา</th>
                  )}
                  {activeTab === "announcements" && <th className="py-3 px-4">วันที่</th>}
                  <th className="py-3 px-4 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-14 h-10 rounded-lg bg-gray-100 relative overflow-hidden border border-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900 max-w-xs truncate">
                      {item.title}
                      {item.description && (
                        <span className="block font-normal text-xs text-gray-500 truncate">
                          {item.description}
                        </span>
                      )}
                    </td>
                    {activeTab === "vaccines" && (
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-700">
                          {item.category || "วัคซีน"}
                        </span>
                      </td>
                    )}
                    {(activeTab === "checkup" || activeTab === "vaccines") && (
                      <td className="py-3 px-4 text-xs font-bold text-orange-600">
                        {item.price || "-"}
                      </td>
                    )}
                    {activeTab === "announcements" && (
                      <td className="py-3 px-4 text-xs text-gray-500">{item.date}</td>
                    )}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="แก้ไข"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <TabIcon className="w-5 h-5 text-[#f97316]" />
              {editingItem ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ชื่อรายการ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น โปรแกรมตรวจสุขภาพ เพศชาย อายุ 35 ปีขึ้นไป"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {(activeTab === "checkup" || activeTab === "vaccines") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ราคา / สิทธิ
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="เช่น ราคา 1,150 บาท"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              {activeTab === "vaccines" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">หมวดหมู่</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                    {["วัคซีนทั่วไป","วัคซีนไข้หวัดใหญ่","วัคซีน HPV","วัคซีนไข้เลือดออก","วัคซีนตับอักเสบ A","วัคซีนตับอักเสบ B","วัคซีนนิวโมคอคคัส","วัคซีนโรคพิษสุนัขบ้า","วัคซีนเด็ก","วัคซีนผู้ใหญ่","อื่นๆ"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}


              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  รูปภาพ
                </label>

                {/* Preview */}
                {formData.image && (
                  <div className="relative mb-2 w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.image}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Upload zone */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) handleFileUpload(file);
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  {isUploading ? (
                    <p className="text-sm text-orange-500 font-medium">กำลังอัปโหลด...</p>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">คลิกหรือลากไฟล์ภาพมาวางที่นี่</p>
                      <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP, GIF</p>
                    </>
                  )}
                </div>

              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  รายละเอียดเพิ่มเติม (ถ้ามี)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="คำอธิบายรายละเอียดโปรแกรม..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-colors shadow-xs"
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
