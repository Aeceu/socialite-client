const AuthBackground = () => {
  return (
    <>
      <div className="filter blur-3xl opacity-50 bg-rose-900  rounded-full w-[1000px] h-[300px] absolute  animate-blob animation-delay-2000 -top-20" />
      <div className="filter blur-3xl opacity-50 bg-fuchsia-500  rounded-full w-[500px] h-[500px] rotate-45 absolute animate-blob -left-20 -bottom-20" />
      <div className="filter blur-3xl opacity-50 bg-indigo-500  rounded-full w-[500px] h-[500px] rotate-45 absolute   animate-blob animation-delay-4000 -right-20 -bottom-20" />
    </>
  );
};
export default AuthBackground;
