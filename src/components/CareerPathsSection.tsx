import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Cpu, 
  Scale, 
  PenTool, 
  Calculator, 
  Palette,
  ArrowRight,
  TrendingUp
} from "lucide-react";

const careerPaths = [
  {
    stream: "Science",
    icon: <Stethoscope className="h-6 w-6" />,
    color: "bg-career-blue",
    careers: [
      {
        title: "Medical Doctor",
        description: "Diagnose and treat patients, specialize in various medical fields",
        requirements: "NEET, MBBS, MD/MS",
        salary: "₹8-25 LPA",
        icon: <Stethoscope className="h-5 w-5" />
      },
      {
        title: "Software Engineer",
        description: "Design and develop software applications and systems",
        requirements: "JEE, B.Tech/BE in CSE",
        salary: "₹6-20 LPA",
        icon: <Cpu className="h-5 w-5" />
      }
    ]
  },
  {
    stream: "Arts",
    icon: <Scale className="h-6 w-6" />,
    color: "bg-career-green",
    careers: [
      {
        title: "Lawyer",
        description: "Practice law, represent clients in legal matters",
        requirements: "CLAT, LLB, Bar Council",
        salary: "₹4-15 LPA",
        icon: <Scale className="h-5 w-5" />
      },
      {
        title: "Content Writer",
        description: "Create engaging content for digital and print media",
        requirements: "BA in English/Journalism",
        salary: "₹3-8 LPA",
        icon: <PenTool className="h-5 w-5" />
      }
    ]
  },
  {
    stream: "Commerce",
    icon: <Calculator className="h-6 w-6" />,
    color: "bg-career-orange",
    careers: [
      {
        title: "Chartered Accountant",
        description: "Handle financial auditing, taxation, and consulting",
        requirements: "CA Foundation, Intermediate, Final",
        salary: "₹6-18 LPA",
        icon: <Calculator className="h-5 w-5" />
      },
      {
        title: "Investment Banker",
        description: "Manage corporate financing and investment strategies",
        requirements: "MBA in Finance, CFA",
        salary: "₹8-25 LPA",
        icon: <TrendingUp className="h-5 w-5" />
      }
    ]
  },
  {
    stream: "Vocational",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-career-purple",
    careers: [
      {
        title: "UI/UX Designer",
        description: "Design user interfaces and experiences for digital products",
        requirements: "Design Portfolio, Certification",
        salary: "₹4-12 LPA",
        icon: <Palette className="h-5 w-5" />
      },
      {
        title: "Digital Marketer",
        description: "Promote brands through digital channels and strategies",
        requirements: "Digital Marketing Certification",
        salary: "₹3-10 LPA",
        icon: <TrendingUp className="h-5 w-5" />
      }
    ]
  }
];

const CareerPathsSection = () => {
  return (
    <section id="careers" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore Career Paths by Stream
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the exciting career opportunities available in each academic stream
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {careerPaths.map((stream, index) => (
            <Card key={index} className="p-6 border-0 shadow-card hover:shadow-hero transition-all bg-gradient-card">
              <div className="space-y-6">
                {/* Stream Header */}
                <div className="text-center">
                  <div className={`${stream.color} p-3 rounded-lg w-fit mx-auto mb-3`}>
                    <div className="text-white">
                      {stream.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{stream.stream}</h3>
                </div>

                {/* Careers */}
                <div className="space-y-4">
                  {stream.careers.map((career, careerIndex) => (
                    <div key={careerIndex} className="bg-card p-4 rounded-lg border">
                      <div className="flex items-start space-x-3">
                        <div className={`${stream.color} p-2 rounded-lg`}>
                          <div className="text-white">
                            {career.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{career.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{career.description}</p>
                          <div className="space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {career.requirements}
                            </Badge>
                            <div className="text-xs font-medium text-career-green">
                              {career.salary}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                <Button variant="outline" className="w-full" size="sm">
                  View All {stream.stream} Careers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-hero hover:shadow-hero transition-all">
            Explore Detailed Career Guides
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;