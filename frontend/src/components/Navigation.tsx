import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sections = [
    { id: "home", label: "Home" },
    { id: "quiz", label: "Quiz" },
    { id: "careers", label: "Careers" },
    { id: "colleges", label: "Colleges" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setShowScrollTop(window.scrollY > 400);

      // Find active section
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted/30 z-50">
        <div 
          className="h-full bg-gradient-hero transition-all duration-300"
          style={{ 
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
          }}
        />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-card/90 backdrop-blur-md border border-border rounded-full p-2 shadow-hero">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-3 h-3 rounded-full mb-3 last:mb-0 transition-all ${
                activeSection === section.id 
                  ? "bg-primary shadow-hero" 
                  : "bg-muted hover:bg-muted-foreground/20"
              }`}
              title={section.label}
            />
          ))}
        </div>
      </nav>

      {/* Scroll to Top - Positioned to avoid Chatbot overlap */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-24 right-6 z-40 rounded-full bg-gradient-hero shadow-hero hover:shadow-hero transition-all duration-300"
          style={{ right: '1.5rem', bottom: '6rem' }} // Position above the Chatbot
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default Navigation;