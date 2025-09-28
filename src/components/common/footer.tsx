import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Facebook,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r rounded-t-2xl from-indigo-50 via-sky-50 to-violet-50 border-t mt-8">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link
            to="/"
            className="font-bold text-xl flex items-center  uppercase"
          >
            <BookOpen className="mr-2" />
            <span className="bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
              Campus Library
            </span>
          </Link>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Simplify how you manage, borrow, and explore books in one smart
            platform.
          </p>

          <div className="flex gap-4 mt-4">
            <Link
              target="_blank"
              to="https://www.facebook.com/nirjhor.nowshad"
              className="p-2 rounded-full bg-white shadow hover:bg-sky-100 transition"
            >
              <Facebook size={18} className="text-sky-600" />
            </Link>
            <Link
              target="_blank"
              to="https://md-akther-hosen.vercel.app"
              className="p-2 rounded-full bg-white shadow hover:bg-indigo-100 transition"
            >
              <Globe size={18} className="text-sky-500" />
            </Link>
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/md-akther-hosen"
              className="p-2 rounded-full bg-white shadow hover:bg-violet-100 transition"
            >
              <Linkedin size={18} className="text-violet-600" />
            </Link>
            <Link
              target="_blank"
              to="https://github.com/AktherHosen"
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            >
              <Github size={18} className="text-gray-700" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-base mb-4 text-gray-800">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Browse Books", href: "/books" },
              { label: "Borrow Summary", href: "/borrow-summary" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-muted-foreground hover:text-sky-600 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-base mb-4 text-gray-800">
            Contact
          </h4>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin size={12} className="mr-2" /> Chittagong, Bangladesh
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Mail size={12} className="mr-2" /> info@campuslibrary.com
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Phone size={12} className="mr-2" /> +880 1234 567890
          </p>
        </div>
      </div>

      <Separator />

      <div className="py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium">Campus Library</span>. All rights
        reserved.
      </div>
    </footer>
  );
}
