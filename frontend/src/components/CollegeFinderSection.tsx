import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Globe, 
  Star,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Search,
  Filter,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";

const colleges = [
  {
    id: 1,
    name: "Indian Institute of Technology Madras (IIT-M)",
    location: "Chennai, Tamil Nadu",
    type: "Institute of National Importance",
    established: 1959,
    rating: 4.9,
    courses: ["B.Tech.", "M.Tech.", "M.Sc.", "Ph.D.", "MS"],
    fees: "₹2.2L - ₹10L/year",
    distance: "12 km from city center",
    highlights: ["Top Engineering Institute", "Government of India", "Global Recognition"],
    phone: "+91-44-2257-8280",
    website: "www.iitm.ac.in",
    image: "🎓"
  },
  {
    id: 2,
    name: "Anna University - CEG Campus",
    location: "Chennai, Tamil Nadu",
    type: "State Government University",
    established: 1978,
    rating: 4.5,
    courses: ["B.E.", "B.Tech.", "M.E.", "M.Tech.", "M.Plan"],
    fees: "₹10,000 - ₹50,000/year",
    distance: "8 km from city center",
    highlights: ["Government of Tamil Nadu", "NAAC A++ Grade", "Excellent Placements"],
    phone: "+91-44-2235-7080",
    website: "www.annauniv.edu",
    image: "🏛️"
  },
  {
    id: 3,
    name: "Madras Medical College",
    location: "Chennai, Tamil Nadu",
    type: "Government Medical College",
    established: 1835,
    rating: 4.7,
    courses: ["MBBS", "MD", "MS", "DM", "M.Ch"],
    fees: "₹5,000 - ₹50,000/year",
    distance: "3 km from city center",
    highlights: ["Government of Tamil Nadu", "Oldest Medical College in India", "Affiliated to TN MGR Medical University"],
    phone: "+91-44-2530-5000",
    website: "www.mmc.tn.gov.in",
    image: "⚕️"
  },
  {
    id: 4,
    name: "College of Engineering, Guindy",
    location: "Chennai, Tamil Nadu",
    type: "Government Engineering College",
    established: 1794,
    rating: 4.6,
    courses: ["B.E.", "B.Tech.", "M.E.", "M.Tech.", "Ph.D."],
    fees: "₹10,000 - ₹50,000/year",
    distance: "7 km from city center",
    highlights: ["Government of Tamil Nadu", "Oldest Engineering College in India", "Constituent College of Anna University"],
    phone: "+91-44-2235-1771",
    website: "www.ceg.annauniv.edu",
    image: "🏗️"
  },
  {
    id: 5,
    name: "Government College of Technology, Coimbatore",
    location: "Coimbatore, Tamil Nadu",
    type: "Government Engineering College",
    established: 1945,
    rating: 4.4,
    courses: ["B.E.", "B.Tech.", "M.E.", "M.Tech."],
    fees: "₹10,000 - ₹50,000/year",
    distance: "500 km from Chennai",
    highlights: ["Government of Tamil Nadu", "Autonomous Institution", "NBA Accredited"],
    phone: "+91-422-2432221",
    website: "www.gct.ac.in",
    image: "⚙️"
  },
  {
    id: 6,
    name: "Government Arts College, Chennai",
    location: "Chennai, Tamil Nadu",
    type: "Government Arts and Science College",
    established: 1855,
    rating: 4.2,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com"],
    fees: "₹2,000 - ₹10,000/year",
    distance: "4 km from city center",
    highlights: ["Government of Tamil Nadu", "Heritage Institution", "Affiliated to University of Madras"],
    phone: "+91-44-2539-9435",
    website: "www.gacmdu.org",
    image: "📚"
  },
  {
    id: 7,
    name: "Alagappa Government Arts College",
    location: "Karaikudi, Tamil Nadu",
    type: "Government Arts and Science College",
    established: 1947,
    rating: 4.1,
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com"],
    fees: "₹2,000 - ₹10,000/year",
    distance: "400 km from Chennai",
    highlights: ["Government of Tamil Nadu", "NAAC 'A' Grade", "Autonomous Institution"],
    phone: "+91-4565-225522",
    website: "www.agacollege.org",
    image: "🎨"
  },
  {
    id: 8,
    name: "Government College of Engineering, Salem",
    location: "Salem, Tamil Nadu",
    type: "Government Engineering College",
    established: 1966,
    rating: 4.0,
    courses: ["B.E.", "B.Tech.", "M.E.", "M.Tech."],
    fees: "₹10,000 - ₹50,000/year",
    distance: "340 km from Chennai",
    highlights: ["Government of Tamil Nadu", "Autonomous Institution", "NBA Accredited"],
    phone: "+91-427-2345533",
    website: "www.gcesalem.edu.in",
    image: "🔧"
  }
];

const CollegeFinderSection = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: "Chennai, Tamil Nadu",
    stream: "All Streams", 
    courseLevel: "All Levels"
  });
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorite-colleges', []);
  const { toast } = useToast();

  const handleSearch = () => {
    let filtered = colleges;
    
    if (searchFilters.location !== "All Locations") {
      filtered = filtered.filter(college => 
        college.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }
    
    if (searchFilters.stream !== "All Streams") {
      filtered = filtered.filter(college => 
        college.courses.some(course => 
          course.toLowerCase().includes(searchFilters.stream.toLowerCase().replace(" stream", ""))
        )
      );
    }
    
    setFilteredColleges(filtered);
    toast({
      title: "Search Updated",
      description: `Found ${filtered.length} colleges matching your criteria.`
    });
  };

  const toggleFavorite = (collegeId: number) => {
    setFavorites(prev => 
      prev.includes(collegeId) 
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId]
    );
    
    const college = colleges.find(c => c.id === collegeId);
    toast({
      title: favorites.includes(collegeId) ? "Removed from Favorites" : "Added to Favorites",
      description: `${college?.name} ${favorites.includes(collegeId) ? 'removed from' : 'added to'} your favorites.`
    });
  };

  return (
    <section id="colleges" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Government Colleges in Tamil Nadu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore top government colleges across Tamil Nadu with detailed information about courses, fees, and admission processes
          </p>
        </div>

        {/* Search Filters */}
        <Card className="p-6 mb-8 border-0 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Colleges
            </h3>
            <Badge variant="outline">
              {filteredColleges.length} colleges found
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <select 
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                >
                  <option>Chennai</option>
                  <option>Coimbatore</option>
                  <option>Salem</option>
                  <option>Karaikudi</option>
                  <option>All Locations</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Stream</label>
              <select 
                className="w-full px-4 py-2 border border-input rounded-md bg-background"
                value={searchFilters.stream}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, stream: e.target.value }))}
              >
                <option>All Streams</option>
                <option>Science</option>
                <option>Arts</option>
                <option>Commerce</option>
                <option>Technical</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Course Level</label>
              <select 
                className="w-full px-4 py-2 border border-input rounded-md bg-background"
                value={searchFilters.courseLevel}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, courseLevel: e.target.value }))}
              >
                <option>All Levels</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Diploma</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-hero" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search Colleges
              </Button>
            </div>
          </div>
        </Card>

        {/* College Results */}
        <div className="grid gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="p-6 border-0 shadow-card hover:shadow-hero transition-all">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* College Info */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{college.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold">{college.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleFavorite(college.id)}
                            className="h-8 w-8"
                          >
                            <Heart className={`h-4 w-4 ${
                              favorites.includes(college.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-muted-foreground'
                            }`} />
                          </Button>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-career-orange text-career-orange" />
                            <span className="text-sm font-medium">{college.rating}</span>
                          </div>
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