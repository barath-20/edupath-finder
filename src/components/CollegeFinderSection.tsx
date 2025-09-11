import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Globe, 
  Star,
  Users,
  BookOpen,
  Award,
  ArrowRight
} from "lucide-react";

const colleges = [
  {
    id: 1,
    name: "Delhi University",
    location: "New Delhi, Delhi",
    type: "Central University",
    established: 1922,
    rating: 4.8,
    courses: ["B.A.", "B.Sc.", "B.Com.", "B.Tech.", "M.A.", "M.Sc."],
    fees: "₹10,000 - ₹50,000/year",
    distance: "2.5 km",
    highlights: ["NAAC A++ Grade", "Top Rankings", "Excellent Placements"],
    phone: "+91-11-2766-7777",
    website: "www.du.ac.in",
    image: "🏛️"
  },
  {
    id: 2,
    name: "Jawaharlal Nehru University",
    location: "New Delhi, Delhi",
    type: "Central University",
    established: 1969,
    rating: 4.6,
    courses: ["B.A.", "M.A.", "M.Phil.", "Ph.D.", "M.Sc.", "MBA"],
    fees: "₹2,000 - ₹15,000/year",
    distance: "8.2 km",
    highlights: ["Research Excellence", "Liberal Arts Focus", "Diverse Community"],
    phone: "+91-11-2670-4000",
    website: "www.jnu.ac.in",
    image: "🎓"
  },
  {
    id: 3,
    name: "Jamia Millia Islamia",
    location: "New Delhi, Delhi",
    type: "Central University",
    established: 1920,
    rating: 4.4,
    courses: ["B.Tech.", "B.A.", "B.Com.", "MBA", "M.Tech.", "M.A."],
    fees: "₹8,000 - ₹45,000/year",
    distance: "12.1 km",
    highlights: ["NAAC A Grade", "Strong Alumni Network", "Industry Connections"],
    phone: "+91-11-2698-1717",
    website: "www.jmi.ac.in",
    image: "🏫"
  },
  {
    id: 4,
    name: "Indira Gandhi Delhi Technical University",
    location: "New Delhi, Delhi",
    type: "State University",
    established: 1952,
    rating: 4.2,
    courses: ["B.Tech.", "M.Tech.", "MBA", "MCA", "Diploma"],
    fees: "₹25,000 - ₹75,000/year",
    distance: "15.5 km",
    highlights: ["Technical Excellence", "Industry Partnerships", "Modern Infrastructure"],
    phone: "+91-11-2390-1430",
    website: "www.igdtuw.ac.in",
    image: "⚙️"
  }
];

const CollegeFinderSection = () => {
  return (
    <section id="colleges" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Government Colleges Near You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover top government colleges in your area with detailed information about courses, fees, and admission processes
          </p>
        </div>

        {/* Search Filters */}
        <Card className="p-6 mb-8 border-0 shadow-card">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <select className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background">
                  <option>New Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Stream</label>
              <select className="w-full px-4 py-2 border border-input rounded-md bg-background">
                <option>All Streams</option>
                <option>Science</option>
                <option>Arts</option>
                <option>Commerce</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Course Level</label>
              <select className="w-full px-4 py-2 border border-input rounded-md bg-background">
                <option>All Levels</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Diploma</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-hero">
                Search Colleges
              </Button>
            </div>
          </div>
        </Card>

        {/* College Results */}
        <div className="grid gap-6">
          {colleges.map((college) => (
            <Card key={college.id} className="p-6 border-0 shadow-card hover:shadow-hero transition-all">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* College Info */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{college.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold">{college.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-career-orange text-career-orange" />
                          <span className="text-sm font-medium">{college.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{college.location} • {college.distance} away</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge variant="outline">{college.type}</Badge>
                          <span className="text-muted-foreground">Est. {college.established}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {college.highlights.map((highlight, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                        <Award className="h-3 w-3 mr-1" />
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Courses & Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Available Courses
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {college.courses.slice(0, 4).map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                      {college.courses.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{college.courses.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Annual Fees:</span>
                      <span className="font-medium text-career-green">{college.fees}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-hero" size="sm">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Globe className="h-3 w-3 mr-1" />
                      Website
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>📞 {college.phone}</div>
                    <div>🌐 {college.website}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Colleges
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CollegeFinderSection;