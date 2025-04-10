const NewsletterBox = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 25% off
      </p>
      <p className="text-gray-400 mt-3">
        Stay in the loop with Liorae—exclusive offers, latest trends, and style
        inspiration delivered to your inbox
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex sm:w-1/2 items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter Your Place Email"
          required
          className="w-full sm:flex-1 outline-none"
        />
        <button className="bg-black text-white text-xs px-10 py-4">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
