const EconomyInfoCard = () => {
  return (
    <section className="m-8 w-full p-6 rounded-lg max-w-2xl shadow-lg bg-white">
      <header className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 shrink-0 w-6 h-6 text-gray-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 19l16 0"></path>
          <path d="M4 15l4 -6l4 2l4 -5l4 4"></path>
        </svg>
        <h3 className="font-medium text-lg">Economy</h3>
      </header>
      <section className="py-4 grid grid-cols-2 gap-x-6">
        <div className="flex items-center py-3">
          <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M7 21l3 -4"></path>
              <path d="M16 21l-2 -4l-3 -3l1 -6"></path>
              <path d="M6 12l2 -3l4 -1l3 3l3 1"></path>
            </svg>
          </span>
          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="font-medium text-sm mr-auto text-gray-700 flex items-center">GDP</h4>
              <span className="px-2 py-1 rounded-lg bg-red-50 text-green-500 text-xs">9th</span>
            </div>
            <p className="">1,988,336 </p>
          </div>
        </div>
        <div className="flex items-center py-3">
          <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              <path d="M7 21l3 -4"></path>
              <path d="M16 21l-2 -4l-3 -3l1 -6"></path>
              <path d="M6 12l2 -3l4 -1l3 3l3 1"></path>
            </svg>
          </span>
          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="font-medium text-sm mr-auto text-gray-700 flex items-center">
                GDP per capita
              </h4>
              <span className="px-2 py-1 rounded-lg bg-red-50 text-green-500 text-xs">16th</span>
            </div>
            <p className="">52,112</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default EconomyInfoCard;
