import { site } from '../../data/site';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-mist md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Nothing on this site is investment advice.</p>
        <a href="#top" className="w-fit underline decoration-line underline-offset-4 hover:text-gold">
          Back to top
        </a>
      </div>
    </footer>
  );
}
