import React from 'react';

const benefitSections = [
    {
        title: "Benefits for Creators",
        icon: "🎨",
        items: [
            "Direct financial support from your fanbase",
            "Engage with your fans on a more personal level",
            "Access to a platform tailored for creative projects",
        ],
    },
    {
        title: "Benefits for Fans",
        icon: "💛",
        items: [
            "Directly contribute to the success of your favorite creators",
            "Exclusive rewards and perks for supporting creators",
            "Be part of the creative process and connect with creators",
        ],
    },
    {
        title: "Benefits of Collaboration",
        icon: "🤝",
        items: [
            "Unlock new opportunities through collaboration with fellow creators",
            "Expand your network and reach a wider audience",
            "Combine skills and resources to create innovative projects",
        ],
    },
    {
        title: "Community Engagement",
        icon: "💬",
        items: [
            "Interact with a supportive community of like-minded individuals",
            "Receive valuable feedback and encouragement from peers",
            "Participate in discussions and events centered around your interests",
        ],
    },
    {
        title: "Access to Resources",
        icon: "📚",
        items: [
            "Gain access to resources such as tutorials, templates, and tools",
            "Receive guidance and mentorship from experienced creators",
            "Stay updated on industry trends and best practices",
        ],
    },
    {
        title: "Recognition and Exposure",
        icon: "🌟",
        items: [
            "Showcase your work to a global audience and gain recognition",
            "Feature in promotional materials and campaigns",
            "Build your portfolio and increase your credibility as a creator",
        ],
    },
    {
        title: "Supportive Community",
        icon: "🌱",
        items: [
            "Join a community that values creativity, diversity, and inclusivity",
            "Find encouragement and inspiration from fellow members",
            "Collaborate on projects and share resources for mutual growth",
        ],
    },
];

const About = () => {
    return (
        <div className="bg-gradient-to-b from-amber-50 via-white to-white">
            {/* Hero */}
            <div className="bg-gradient-to-br from-amber-600 to-orange-500 text-white">
                <div className="container mx-auto px-6 md:px-8 py-16 max-w-5xl">
                    <span className="inline-block text-sm font-semibold tracking-wide uppercase bg-white/15 px-3 py-1 rounded-full mb-4">
                        About us
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                        About Get Me a Chai ☕
                    </h1>
                    <p className="text-lg text-amber-50 max-w-2xl">
                        Get Me a Chai is a crowdfunding platform designed for creators to
                        fund their projects with the support of their fans. It&apos;s a
                        space where your fans can directly contribute to your creative
                        endeavors by buying you a chai. Unlock the potential of your
                        fanbase and bring your projects to life.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-8 py-12 max-w-5xl">
                {/* How it works */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 bg-white border border-amber-100 rounded-xl p-5 shadow-sm">
                            <img
                                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                src="/group.gif"
                                alt="Fans Want to Collaborate"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                    Fans Want to Collaborate
                                </h3>
                                <p className="text-slate-600">
                                    Your fans are enthusiastic about collaborating with you on
                                    your projects.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 bg-white border border-amber-100 rounded-xl p-5 shadow-sm">
                            <img
                                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                src="/coin.gif"
                                alt="Support Through Chai"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                    Support Through Chai
                                </h3>
                                <p className="text-slate-600">
                                    Receive support from your fans in the form of chai
                                    purchases, directly contributing to your project funding.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefit sections */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                        Why Join Get Me a Chai
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefitSections.map((section) => (
                            <div
                                key={section.title}
                                className="bg-white border border-amber-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center size-10 rounded-full bg-amber-100 text-xl">
                                        {section.icon}
                                    </span>
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        {section.title}
                                    </h3>
                                </div>
                                <ul className="space-y-2">
                                    {section.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-2 text-slate-600 leading-snug"
                                        >
                                            <span className="text-amber-500 mt-0.5">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;

export const metadata = {
    title: "About - Get Me A Chai",
};