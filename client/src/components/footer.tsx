export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-bg py-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            {currentYear} Pratham - Computer Engineering Student at Parul University & AI Developer
          </div>
          <div className="flex space-x-4">
            <span className="text-xs text-muted-foreground">
              Built with passion for AI and innovation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
