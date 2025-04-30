export default function Footer() {
    return (
      <footer className="bg-gradient-to-b from-[#FFE4D7] to-white py-10">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-black mb-4">Sahayak is here for you</h3>
          <p className="text-black max-w-xl mx-auto mb-6">
            This space is made with love to support your mental wellness journey. You're never alone.
          </p>
          <p className="text-sm text-black">&copy; {new Date().getFullYear()} Sahayak. Built with ❤️ by Arzoo.</p>
        </div>
      </footer>
    );
  }
  