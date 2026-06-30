import { ArrowRight } from "lucide-react";
import { CategoryList } from "@/components/ui/category-list";
import MistBackground from "./realistic-fog-background";

export function OfferingsSection() {
  const innerWorldCategories = [
    {
      id: 1,
      title: "Growing Into Who You Are",
      subtitle: "Stepping into the hidden forces that give you momentum",
      description: "Transformation happens either through conscious creation, or by a kick in the ass from the universe — maybe you\"ve experienced this. The former turns out to be more sustainable. By deepening your relationship to your inner world, you grow your capacity to meet the outer world on your own terms. It also turns out that you have a powerful system of creative fuel and environmental response information called \"Feelings\". Lasting transformation happens by harnessing their raw energy and information, and by inspecting and replacing the old decisions and beliefs that keep your spark locked away.",
      icon: <ArrowRight className="w-8 h-8" />,
      onClick: () => {},
    },
    {
      id: 2,
      title: "Learning to Be With Yourself",
      subtitle: "Accepting where you are now gives you the most power to transform",
      description: "You are many things and have many parts. All these different parts of yourself serve different purposes and are constantly vying for expression. One of these parts is the part of you that chooses which part shows up in the world. To experience the distinction between the parts that are conscious and the parts that are unconscious, skills of Inner Navigation are required. No part of you is wrong or right, good or bad. Each has its function and accepting all the different parts of You is a pivotal step towards Self-Mastery.",
      icon: <ArrowRight className="w-8 h-8" />,
      onClick: () => {},
    },
  ];

  const outerWorldCategories = [
    {
      id: 3,
      title: "Bringing Your Project to Life",
      subtitle: "Bridging your creative vision to the world through Authenticity",
      description: "As well as being a part of creative projects, I have a background in business and have led systemic changes in my previous management role. I use this background to create bridges from the existing power structures that determine laws and resource allocation to your spark of Creation. I use systems thinking, automation design, and purpose distillation to empower your project to be an invitation for people to move from corporate consumerism to coming to life.",
      icon: <ArrowRight className="w-8 h-8" />,
      onClick: () => {},
    },
    {
      id: 4,
      title: "Making Things Beautiful and Clear",
      subtitle: "Clarity and aesthetic excellence in your work and how you present it to the world",
      description: "I offer design coaching and aesthetic feedback, as well as specific deliverables such as website design, audio work, and graphic design to make your work a clear invitation that is true to your project\"s purpose.",
      icon: <ArrowRight className="w-8 h-8" />,
      onClick: () => {},
    },
  ];

  return (
    <section id="offerings" className="relative z-0 overflow-hidden py-28">
      <MistBackground />
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">My Approach</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-foreground">Coaching Offerings</h2>
        </div>

        {/* Inner World Group */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">Inner World</h3>
          <CategoryList
            title=""
            subtitle=""
            categories={innerWorldCategories}
            headerIcon={null}
          />
        </div>

        {/* Outer World Group */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">Outer World</h3>
          <CategoryList
            title=""
            subtitle=""
            categories={outerWorldCategories}
            headerIcon={null}
          />
        </div>
      </div>
    </section>
  )
}