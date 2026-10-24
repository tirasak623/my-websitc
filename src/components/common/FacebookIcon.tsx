interface FacebookIconProps {
  size?: number;
  className?: string;
}

/**
 * lucide-react ตัดไอคอนแบรนด์ (เช่น Facebook) ออกจากไลบรารีแล้ว
 * จึงสร้างไอคอนนี้เองเพื่อใช้กับปุ่มลิงก์ไป Facebook
 */
export function FacebookIcon({ size = 18, className = "" }: FacebookIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.6-1.5h1.5V4.2C15.9 4.1 14.9 4 13.8 4c-2.3 0-3.9 1.4-3.9 4v2.4H7.3v3h2.6V21h3.6z" />
    </svg>
  );
}
