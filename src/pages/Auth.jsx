export default function Auth() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">Connexion</h2>
      
      <form className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full border rounded-lg p-2"
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          className="w-full border rounded-lg p-2"
        />
        <button 
          type="submit" 
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
        >
          Se connecter
        </button>
      </form>
      
      <p className="mt-4 text-sm text-center text-gray-600">
        Pas encore de compte ? <a href="#" className="text-teal-600 font-semibold">S’inscrire</a>
      </p>
    </div>
  );
}
