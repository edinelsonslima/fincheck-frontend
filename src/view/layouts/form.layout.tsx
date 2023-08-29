import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface FormLayoutProps {
  title: string;
  subtitle: string;
  link: {
    to: string;
    text: string;
  };
}

export function FormLayout({
  link,
  subtitle,
  title,
  children,
}: PropsWithChildren<FormLayoutProps>) {
  return (
    <>
      <header className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tightest">
          {title}
        </h1>
        <p className="space-x-2 tracking-tighter">
          <span className="text-gray-700">{subtitle}</span>
          <Link to={link.to} className="font-medium text-teal-900">
            {link.text}
          </Link>
        </p>
      </header>

      {children}
    </>
  );
}
