import { useState, useEffect, useCallback, useRef } from "react";

// place to try out the code from interviewPrep.tsx
const PracticePage = () => {
  // --- PRACTICE: for class components ---
  // class App extends React.Component {
  //   constructor(props: any) {
  //     super(props);
  //     this.handleClick = this.handleClick.bind(this);
  //   }
  //   handleClick(event: any) {
  //     const id = event.target.id;
  //     console.log(id);
  //   }
  //   render() {
  //     return (
  //       <button id="unique-id" onClick={this.handleClick}>
  //         Button
  //       </button>
  //     );
  //   }
  // }

  // --- PRACTICE: debounce ---
  function debounce(func: Function, wait: number) {
    // replacing the type of NodeJS.Timeout for just number
    let timeout: number;

    return (...args: any[]) => {
      clearTimeout(timeout); // Step 1: Clear the existing timeout.
      // directly calling window.setTimeout for compatibility
      timeout = window.setTimeout(() => func(...args), wait); // Step 2: Set a new timeout.
    };
  }
  // If the user scrolls rapidly, logScroll will not be called immediately.
  // Instead, it will be called only after 200 milliseconds have passed since the last scroll event

  // easy example to test out debounce
  const logScroll = () => {
    console.log("Scroll event triggered!");
  };

  const debouncedLogScroll = debounce(logScroll, 1000);

  // NOTE: the eventListening is never removed, play around with it either here or in the useEffect()
  window.addEventListener("scroll", debouncedLogScroll);

  // --- PRACTICE: useCallback ---
  // simulate the api call by just adding more cat pictures on scroll
  // NOTE: this actually doesn't work without the initial cat; find a fix
  const [loading, setLoading] = useState(false);
  const [catCount, setCatCount] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const generateCats = () => {
    // NOTE: not sure the behaviour of the loading state here working as intended...
    setLoading(true);
    if (catCount <= 50) {
      if (containerRef.current) {
        const img = document.createElement("img");
        img.src = "tiredcat.jpg";
        img.alt = "cat";
        containerRef.current.appendChild(img);
      }
    } else {
      console.log("that's too many cats!");
    }
    setLoading(false);
  };

  const handleScroll = useCallback(() => {
    // the sum of innerHeight and scrollTop represent's users current scroll position relative to top
    // if this is greater or equal to offsetHeight + threshold, user is within x pixels of bottom of...
    //  ... page, where x is the threshold
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 && // adjust threshold as needed
      !loading
    ) {
      // console.log(loading); // should be false
      generateCats(); // somewhere during this function, loading should be true
      setCatCount(catCount + 1);
      // console.log(loading); // should be false again
    }
  }, [loading, catCount]);

  useEffect(() => {
    // debounce to limit rapid calls
    const debouncedScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll); // cleanup
  }, [handleScroll]);

  return (
    <>
      <div ref={containerRef}>
        <img src="tiredcat.jpg" alt="cat"></img>
      </div>
    </>
    // <>
    //   <h1 className="header">Practice</h1>
    //   <App />
    // </>
  );
};

export default PracticePage;
