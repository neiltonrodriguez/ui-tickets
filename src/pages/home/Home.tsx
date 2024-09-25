const Home = () => {
  
  return (
    <div className="container mx-auto">
      <div className="flex gap-3">
        <div className="bg-green-300 h-40 p-5 w-1/3 flex flex-col items-center justify-center">
          <h1 className="text-black text-2xl font-bold">LDAPs</h1>
          <span className="text-4xl text-white">160</span>
        </div>
        <div className="bg-blue-300 h-40 p-5 w-1/3 flex flex-col items-center justify-center">
        <h1 className="text-black text-2xl font-bold">CHAMADOS ABERTOS</h1>
          <span className="text-4xl text-white">15</span>
        </div>
        <div className="bg-orange-300 h-40 p-5 w-1/3 flex flex-col items-center justify-center">
        <h1 className="text-black text-2xl font-bold">USUÁRIOS CADASTRADOS</h1>
          <span className="text-4xl text-white">215</span>
        </div>
      </div>
    </div>
  );
  }
  
  export default Home