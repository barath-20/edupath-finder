import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CareerCompass</h1>
              <p className="text-xs text-muted-foreground">Your Education Guide</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#quiz" className="text-foreground hover:text-primary transition-colors">Take Quiz</a>
            <a href="#careers" className="text-foreground hover:text-primary transition-colors">Explore Careers</a>
            <a href="#colleges" className="text-foreground hover:text-primary transition-colors">Find Colleges</a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-gradient-hero hover:shadow-hero transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-foreground hover:text-primary transition-colors py-2">Home</a>
              <a href="#quiz" className="text-foreground hover:text-primary transition-colors py-2">Take Quiz</a>
              <a href="#careers" className="text-foreground hover:text-primary transition-colors py-2">Explore Careers</a>
              <a href="#colleges" className="text-foreground hover:text-primary transition-colors py-2">Find Colleges</a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="bg-gradient-hero">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;