import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "gold" | "green"
  size?: "sm" | "md" | "lg"
}

export default function Logo({ variant = "gold", size = "md" }: LogoProps) {
  const logoSrc = variant === "gold" ? "/images/logo-gold.png" : "/images/logo-green.png"

  const sizes = {
    sm: { width: 100, height: 100 },
    md: { width: 150, height: 150 },
    lg: { width: 200, height: 200 },
  }

  const { width, height } = sizes[size]

  return (
    <Link href="/" className="flex items-center justify-center">
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="Eleve Café"
        width={width}
        height={height}
        className="transition-all duration-300 hover:opacity-90"
      />
    </Link>
  )
}
