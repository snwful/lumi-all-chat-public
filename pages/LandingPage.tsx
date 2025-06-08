
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import PricingCard from '../components/PricingCard';
import { SUBSCRIPTION_PLANS, APP_NAME, SparklesIcon, InboxStackIcon, BoltIcon, ChartBarIcon, LightBulbIcon, PencilSquareIcon, CogIcon } from '../constants';
import Card from '../components/Card';

interface FeatureCardProps {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <Card className="p-6 text-center items-center flex flex-col h-full">
        <div className="flex-shrink-0 mb-4 text-brand-accent bg-brand-accent-soft p-3 rounded-full">
            {React.cloneElement(icon, { className: "w-8 h-8"})}
        </div>
        <h3 className="text-lg font-semibold text-brand-primary mb-2">{title}</h3>
        <p className="text-sm text-brand-secondary leading-relaxed">{description}</p>
    </Card>
);


const LandingPage: React.FC = () => {
  return (
    <div className="text-brand-primary">
      {/* Hero Section */}
      <section className="bg-brand-accent-soft py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SparklesIcon className="w-16 h-16 text-brand-accent mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="block xl:inline">Manage All Your Chats</span>{' '}
            <span className="block text-brand-accent xl:inline">Smarter with {APP_NAME}</span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-lg text-brand-secondary sm:text-xl md:mt-8 md:max-w-3xl">
            The ultimate unified inbox with an intelligent AI assistant to help you sell more and provide amazing customer support. Never miss a message again.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Button size="lg" variant="primary" onClick={() => alert('Get Started Clicked!')} className="w-full sm:w-auto">
                Get Started Free
              </Button>
              <Link to="/inbox">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Inbox
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-brand-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need, all in one place.
            </h2>
            <p className="mt-4 text-lg text-brand-secondary">
              Lumi All Chat combines powerful features to streamline your online sales.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
                icon={<BoltIcon />}
                title="AI Chat Assistant"
                description="Our intelligent AI works in Auto, Semi-auto, or Manual mode to answer queries, suggest replies, and free up your time."
            />
            <FeatureCard
                icon={<InboxStackIcon />}
                title="Unified Inbox"
                description="View and reply to messages from Facebook, Instagram, LINE, TikTok Shop, Shopee & Lazada in one dashboard."
            />
            <FeatureCard
                icon={<PencilSquareIcon />}
                title="Customer Profiles"
                description="Instantly see customer history, order details, and past conversations for personalized support."
            />
            <FeatureCard
                icon={<LightBulbIcon />}
                title="Quick Replies & Tags"
                description="Save common responses and organize chats with custom tags for efficient management."
            />
            <FeatureCard
                icon={<ChartBarIcon />}
                title="Analytics Dashboard"
                description="Gain insights into chat volume, response times, sales attribution, and team performance."
            />
            <FeatureCard
                icon={<CogIcon />}
                title="Broadcast & Team Tools"
                description="Send targeted messages to customer segments and collaborate effectively with your team (Pro/Business plans)."
            />
          </div>
        </div>
      </section>
      
      {/* AI Modes Explanation */}
      <section className="py-16 md:py-24 bg-brand-accent-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Your AI Co-pilot</h2>
            <p className="mt-4 text-lg text-brand-secondary">
              Flexible AI modes designed to fit your workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-brand-primary mb-2">Auto Mode</h3>
              <p className="text-sm text-brand-secondary">AI handles common questions 100% automatically. Ideal for FAQs like "Price?", "In stock?". Learns from your interactions.</p>
            </Card>
            <Card className="p-6 ring-2 ring-brand-accent">
              <h3 className="text-xl font-semibold text-brand-primary mb-2">Semi-auto Mode</h3>
              <p className="text-sm text-brand-secondary">AI drafts replies for your review. Send, edit, or choose other AI suggestions. Perfect for sensitive or complex queries needing a human touch.</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-brand-primary mb-2">Manual Mode</h3>
              <p className="text-sm text-brand-secondary">Take full control and type responses directly. Best for unique situations or building rapport with key customers.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-brand-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose Your Perfect Plan
            </h2>
            <p className="mt-4 text-lg text-brand-secondary">
              Simple pricing for businesses of all sizes. Start free, upgrade as you grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-brand-accent text-brand-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Revolutionize Your Customer Chat?
            </h2>
            <p className="mt-4 text-lg text-sky-100">
                Join thousands of sellers growing their business with {APP_NAME}.
            </p>
            <div className="mt-8">
                <Button size="lg" variant="secondary" className="bg-white text-brand-accent hover:bg-slate-100" onClick={() => alert('Sign up for Free clicked!')}>
                    Sign Up for Free
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
