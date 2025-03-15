interface BlogPost {
  title: string;
  text: string;
}

const sections: BlogPost[] = [
  {
    title: "Choosing the Right College Major",
    text: "The choice of college major is a very important one and may even define how your life eventually turns out. With hundreds of majors available, choosing a perfect major could become overwhelming; however, the right strategy will get you to make a choice that best suits your interests, skills, and career goals."
  },
  {
    title: "1. Understand Your Interests",
    text: "First, identify what subjects or activities excite you. Think about classes you loved in high school or hobbies you love doing. Sometimes your interests can help you find a major that will make you want to stick with it.Transitioning from high school into college means more freedom. So, choosing a major based on true interest can help keep one focused and interested throughout their studies."
  },
  {
    title: "2. Assess Your Abilities and Talents Next are your skills:",
    text: "Is one good in math, writing, or problem-solving? Every major has its own demanded set of skills. Assessing the things that you are good at could probably help ascertain some of the major options that you might want to eventually choose between.The aim behind this introspection is that it helps you to just pick up those majors in which you are confident of excelling. This becomes necessary because the success in these studies will provide a launching pad for future opportunities."
  },
  {
    title: "3. Research Career Opportunities",
    text: "It is also important to become informed about the career opportunities a given major would provide. Consider how each major aligns with a particular industry or job. Some fields of study are fairly direct leading into a specific career path, such as engineering or nursing. Other fields, such as psychology or sociology, are less direct and offer more flexibility.It is similarly important to know the job market trends. As important as passion is, choosing a major with good job prospects is equally critical in terms of long-term success."
  },
  {
    title: "4. Job Stability and Salary",
    text: "Although it shouldn't be the sole deciding factor, salary and job security may come into play. Some majors put students in higher-paying jobs, others may put students into careers that do not pay as well. Based on your major, look at the average salary and job security using a reliable source.You need to find a balance between your interests and financial practicality to ensure that you select a major that's sustainable for your future."
  },
  {
    title: "5. Early Major Exploration",
    text: "Many students begin college without a declared major; that is perfectly fine. Your first year can be used to explore various subjects through introductory courses. Take advantage of the ability to use electives to try out fields you're curious about.You can therefore have an idea of what interests you by trying out a number of subjects. Such a process helps in ensuring that you do not arrive at a verdict too early."
  },
  {
    title: "6. Seek Advisors and Professionals for Advice",
    text: "College advisors will have much to say about different majors and what is waiting for you when you enter those fields. They also can help you choose between paths based on your strengths and goals. Additionally, talking to professionals in the fields you're considering can provide a better reality check.And for advice on which paths might suit you, mentors and professors can be shared. Their experience will help you avoid common pitfalls and make informed decisions."
  },

  {
    title: "7. Keep an Open Mind",
    text: "You might feel pressed to choose a major in haste, but it is very important not to shut your mind. As you go along studying, your interests may change. Be open to switching majors if you find other passions along the way.It is quite normal to switch your major once or twice during college. Well, the important thing is to find out what will suit you for your long-run objectives.Frequently Asked Questions"
  },
  {
    title: "Conclusion",
    text: "Picking up a college major requires time and reflection. When you can understand your interests, assess your strengths, and then explore options, you make an informed decision. Also, remember that advice from others and openness to change come in quite handy. Ultimately, the major which falls in the category of setting a path to success both personally and professionally would be deemed right."
  }
];

export default function BlogPost() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center">
      
      <div className="flex justify-start w-full text-gray-600 mb-4">
        <div className="text-left">
          <p className="text-b3 sm:text-base"><strong>Author:</strong> Sheikh, M.</p>
          <p className="text-b3 sm:text-base"><strong>Publication Date:</strong> March 15, 2023</p>
        </div>
      </div>
      
      <p className="text-b1 sm:text-b2 md:text-b1 font-bold text-center mb-4 sm:mb-6">
        {sections[0].title}
      </p>

      
      <p className="text-base sm:text-b1 md:text-xl text-gray-700 mb-4 sm:mb-6 text-center px-4 sm:px-8 md:px-12">
        {sections[0].text}
      </p>

     
      <div className="flex justify-center w-full mb-4 sm:mb-6">
        <img
          src="/Assets/Blog/major.png"
          alt="Selecting a College Major"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
        />
      </div>

      
      <div className="w-full space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-8 lg:px-10">
        {sections.slice(1).map((section, index) => (
          <div key={index} className="bg-mysecondary p-4 sm:p-6 md:p-8 lg:p-10 w-full">
            <h2 className="text-b1 sm:text-b1 md:text-3xl font-bold mb-2 sm:mb-3">{section.title}</h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg">{section.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-b3 text-gray-600">
        <p>Reference:</p>
        <p>Sheikh, M. (2024, March 15). <i>How to choose the right college major</i>. Medium. Retrieved from <a href="https://medium.com/@manosheikh7676/how-to-choose-the-right-college-major-2ea708090cef" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://medium.com/@manosheikh7676/how-to-choose-the-right-college-major-2ea708090cef</a></p>
      </div>
    </div>
  );
}
