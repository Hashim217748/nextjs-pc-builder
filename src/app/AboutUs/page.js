"use client";
import Link from "next/link";
import Screen from "../Components/Screen";
import Sidebar from "../Components/sidebar";

export default function Guides() {
  return (
    <Screen>
      <Sidebar />
      <div className="w-full min-h-screen">
        <p className="text-center font-extrabold font-funnel px-32 text-3xl pt-10">
          About Us
        </p>
        <div className="px-32 py-10">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6">
            At TechForge, we are dedicated to demystifying the PC building
            process. Our mission is to empower enthusiasts and newcomers alike
            to build their dream PCs with confidence and ease. By providing
            comprehensive part-picking tools and detailed build guides, we aim
            to make the journey from idea to reality as smooth and enjoyable as
            possible.
          </p>

          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="mb-6">
            TechForge was founded by a team of passionate gamers and tech
            enthusiasts who saw the need for a user-friendly platform that
            simplifies the complex world of PC building. Our team combines years
            of experience in hardware, software, and customer service to offer
            you the best advice and support. We are here to help you navigate
            the ever-evolving landscape of PC components and build the perfect
            setup for your needs.
          </p>

          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p className="mb-6">
            We offer a comprehensive suite of tools designed to make PC building
            accessible to everyone. Our part-picker tool allows you to compare
            and select components based on compatibility and performance. Our
            build guides are crafted to cater to various budgets and use cases,
            from gaming to streaming and professional workstations.
            Additionally, our community forums provide a space for users to
            share experiences, ask questions, and get advice from fellow
            builders and our expert staff.
          </p>

          <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
          <p className="mb-6">
            At TechForge, we pride ourselves on our commitment to quality and
            customer satisfaction. We continually update our database with the
            latest components and prices, ensuring you have access to the best
            deals. Our guides are meticulously researched and regularly updated
            to reflect the newest trends and technologies. We are here to
            support you every step of the way, from planning your build to
            troubleshooting any issues you might encounter.
          </p>

          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">
            Building a PC is not just about the hardware; it's about being part
            of a community that shares your passion. Join our forums to connect
            with other builders, exchange tips and tricks, and showcase your
            builds. Follow us on social media to stay up-to-date with the latest
            news and trends in the PC building world. At TechForge, you're not
            just a customer; you're part of a family that loves everything about
            custom PCs.
          </p>
        </div>
      </div>
    </Screen>
  );
}
