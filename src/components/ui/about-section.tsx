export function AboutSection() {
  return (
    <section id="about" className="section-alt py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Welcome to the website of</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-foreground">Sebastian Norton</h2>
            <img
              src="/seb-profile.jpg"
              alt="Sebastian Norton"
              className="rounded-xl w-full max-w-sm shadow-lg"
            />
          </div>
          <div className="space-y-4 prose-measure">
            <p className="text-md text-muted-foreground leading-relaxed">
              All my life I&rsquo;ve wanted to see people fly. From my time in music groups and collaborative creative work, I&rsquo;ve always sensed a bright creative spark in every person I&rsquo;ve met. Whether creating for the stage, creating the stage, creating a culture in the crowd, creating a non-linear identity through dress and speech, creating love and intimacy in their relationships; it&rsquo;s clear to me that the creative urge always finds its way into the world. Yet all this time I&rsquo;ve been left with questions.
            </p>
            <p className="text-md text-muted-foreground leading-relaxed">
              Why are some peoples sparks so hidden that they don&rsquo;t believe they have one?
            </p>
            <p className="text-md text-muted-foreground leading-relaxed">
              What are the skills and new decisions needed for their spark of Creation to come to life?
            </p>
            <p className="text-md text-muted-foreground leading-relaxed">
              What could be possible if they created consciously, rather than unconsciously creating from their shadows?
            </p>
            <p className="text-md text-muted-foreground leading-relaxed">
              I am a researcher of these things. I carry my questions close to my heart and into every interaction. I create and practice non-linear experiments to map my experience and stay honest about what&rsquo;s actually happening in myself and in the world. I want to share this research with you and discover what your creative spark is. I have a longing to know what happens when you set your spark on fire and start building, designing, improvising, destroying, rearranging, declaring in service of the real purpose you decided to be born at this time on this planet for. 
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}