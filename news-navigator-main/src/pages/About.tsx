import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">About NewsHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted source for comprehensive, unbiased news coverage from around the world.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12 shadow-card">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At NewsHub, we believe in the power of informed citizens. Our mission is to deliver accurate,
              timely, and relevant news coverage that helps you understand the world around you. We aggregate
              content from trusted sources worldwide, bringing you diverse perspectives on the stories that
              matter most.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                We verify facts and present information from reliable sources.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Building a community of informed readers who engage with quality journalism.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Committed to delivering the highest quality news experience.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global</h3>
              <p className="text-sm text-muted-foreground">
                Coverage spanning across continents, cultures, and communities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <Card className="shadow-card">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                NewsHub was founded with a simple yet powerful vision: to create a platform where people can
                access quality journalism from diverse sources, all in one place. We recognized that in today's
                fast-paced world, staying informed shouldn't mean spending hours browsing multiple news sites.
              </p>
              <p>
                Our team of dedicated journalists and technologists work tirelessly to curate, verify, and
                present news in a way that's both comprehensive and easy to digest. We partner with leading news
                organizations worldwide to bring you perspectives from every corner of the globe.
              </p>
              <p>
                Today, NewsHub serves millions of readers who trust us to keep them informed about the issues
                that shape our world. We're proud to be part of your daily routine and committed to evolving
                with the changing media landscape.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
