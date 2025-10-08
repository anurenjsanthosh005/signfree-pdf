import React from "react";

function HowToUse() {
  const steps = [
    { step: "Step 1", description: "Upload the file you want to edit." },
    { step: "Step 2", description: "Upload your signature or create one." },
    { step: "Step 3", description: "Add your signature to the uploaded file." },
    { step: "Step 4", description: "Download your signed file instantly." },
  ];

  return (
    <div className="w-full max-w-4xl mt-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#134686] mb-6 text-center">
        How to Use
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
        {steps.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">{item.step}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowToUse;
