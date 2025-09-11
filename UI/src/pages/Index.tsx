import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Your existing website content would go here */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Your Adventure Website</h1>
          <p className="text-xl text-muted-foreground">
            This is where your existing website content would be displayed.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Try the chatbot in the bottom right corner!
          </p>
        </div>
      </div>
      
      {/* Chatbot Component */}
      <ChatBot />
    </div>
  );
};

export default Index;
