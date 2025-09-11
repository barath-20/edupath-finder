import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Engineering Student",
    college: "IIT Delhi",
    stream: "Science",
    quote: "CareerCompass helped me realize my passion for engineering. The quiz results gave me confidence to pursue JEE preparation, and now I'm studying at my dream college!",
    rating: 5,
    avatar: "PS",
    achievement: "JEE Main AIR 245"
  },
  {
    id: 2,
    name: "Rahul Gupta", 
    role: "Law Student",
    college: "NLSIU Bangalore",
    stream: "Arts",
    quote: "I was confused between science and arts. The detailed career mapping showed me the exciting opportunities in law. Today, I'm grateful for that guidance!",
    rating: 5,
    avatar: "RG",
    achievement: "CLAT AIR 89"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "CA Aspirant",
    college: "Shri Ram College",
    stream: "Commerce", 
    quote: "The commerce stream analysis was spot-on. It helped me understand the CA pathway clearly, and the college finder feature was incredibly useful for my applications.",
    rating: 5,
    avatar: "AP",
    achievement: "CA Foundation Rank 12"
  },
  {
    id: 4,
    name: "Karan Singh",
    role: "UX Designer",
    college: "NIFT Delhi",
    stream: "Vocational",
    quote: "CareerCompass opened my eyes to vocational opportunities. The platform showed me that creative careers are just as rewarding. Now I'm a successful UX designer!",
    rating: 5,
    avatar: "KS",
    achievement: "NIFT Entrance Rank 15"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Success Stories from Our Students
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how CareerCompass has helped thousands of students find their perfect career path
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 border-0 shadow-card hover:shadow-hero transition-all bg-gradient-card">
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-career-orange text-career-orange" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                  <p className="text-sm text-muted-foreground italic pl-4">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Student Info */}
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-hero text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.college}</p>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="flex items-center justify-between">
                  <Badge 
                    className={`text-xs ${
                      testimonial.stream === 'Science' ? 'bg-career-blue' :
                      testimonial.stream === 'Arts' ? 'bg-career-green' :
                      testimonial.stream === 'Commerce' ? 'bg-career-orange' :
                      'bg-career-purple'
                    } text-white`}
                  >
                    {testimonial.stream}
                  </Badge>
                  <div className="text-xs font-medium text-career-green">
                    {testimonial.achievement}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Students Guided</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Career Paths</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-career-purple mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Partner Colleges</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;