/* =========================================================
   SCHOLARSHIP SAATHI
   Scholarship Finder / Eligibility Suggestions
   ========================================================= */


/*
    Scholarship database

    IMPORTANT:
    These are guidance rules only.
    Final eligibility must always be checked
    on the respective official portal.
*/

const scholarshipData = [

    {
        name: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Scheme",

        portal: "MahaDBT",

        url: "https://mahadbt.maharashtra.gov.in/",

        education: ["ug", "pg", "diploma"],

        caste: ["general", "ews", "other"],

        income: ["under1", "1to2.5", "2.5to5", "5to8"],

        states: ["maharashtra"],

        courses: [
            "general",
            "it",
            "engineering",
            "management",
            "other"
        ],

        description:
            "A Maharashtra scheme providing financial assistance for eligible students in higher education. Scheme-specific course, institution and other conditions apply.",

        reason:
            "Your education level, state and income details may match important criteria used by this scheme."
    },


    {
        name: "Post Matric Scholarship to OBC Students",

        portal: "MahaDBT",

        url: "https://mahadbt.maharashtra.gov.in/",

        education: ["ug", "pg", "diploma"],

        caste: ["obc"],

        income: ["under1", "1to2.5"],

        states: ["maharashtra"],

        courses: [
            "general",
            "it",
            "engineering",
            "management",
            "medical",
            "other"
        ],

        description:
            "A Maharashtra post-matric scholarship scheme for eligible OBC students. Course, income, residence and other conditions apply.",

        reason:
            "Your selected OBC category, Maharashtra domicile and income range may match the scheme's listed criteria."
    },


    {
        name: "Post Matric Scholarship to VJNT Students",

        portal: "MahaDBT",

        url: "https://mahadbt.maharashtra.gov.in/",

        education: ["ug", "pg", "diploma"],

        caste: ["vjnt"],

        income: ["under1", "1to2.5"],

        states: ["maharashtra"],

        courses: [
            "general",
            "it",
            "engineering",
            "management",
            "medical",
            "other"
        ],

        description:
            "A Maharashtra post-matric scholarship scheme for eligible VJNT students. Additional scheme conditions apply.",

        reason:
            "Your selected VJNT category, Maharashtra domicile and income range may match important criteria."
    },


    {
        name: "Post Matric Scholarship to SBC Students",

        portal: "MahaDBT",

        url: "https://mahadbt.maharashtra.gov.in/",

        education: ["ug", "pg", "diploma"],

        caste: ["sbc"],

        income: ["under1", "1to2.5"],

        states: ["maharashtra"],

        courses: [
            "general",
            "it",
            "engineering",
            "management",
            "medical",
            "other"
        ],

        description:
            "A Maharashtra post-matric scholarship scheme for eligible SBC students. Course and other eligibility requirements apply.",

        reason:
            "Your selected SBC category, Maharashtra domicile and income range may match the scheme's listed criteria."
    },


    {
        name: "National Scholarship Portal – Central Scholarship Schemes",

        portal: "National Scholarship Portal",

        url: "https://scholarships.gov.in/All-Scholarships",

        education: ["ug", "pg", "diploma", "school"],

        caste: [
            "general",
            "ews",
            "obc",
            "sc",
            "st",
            "vjnt",
            "sbc",
            "minority",
            "other"
        ],

        income: [
            "under1",
            "1to2.5",
            "2.5to5",
            "5to8",
            "above8"
        ],

        states: [
            "maharashtra",
            "other"
        ],

        courses: [
            "general",
            "it",
            "engineering",
            "management",
            "medical",
            "other"
        ],

        description:
            "The National Scholarship Portal provides access to multiple scholarship schemes from different government departments. Individual scheme eligibility varies.",

        reason:
            "Your profile can be used to explore central scholarship schemes available through the National Scholarship Portal."
    }

];


/* =========================================================
   CHECK ELIGIBILITY
   ========================================================= */

function checkEligibility() {

    const education =
        document.getElementById("education").value;

    const course =
        document.getElementById("course").value;

    const year =
        document.getElementById("year").value;

    const income =
        document.getElementById("income").value;

    const state =
        document.getElementById("state").value;

    const caste =
        document.getElementById("caste").value;

    const results =
        document.getElementById("results");


    /*
        Calculate matching score
    */

    const scoredScholarships =
        scholarshipData.map(scholarship => {

            let score = 0;

            let matchedCriteria = [];


            /* Education */

            if (scholarship.education.includes(education)) {

                score += 30;

                matchedCriteria.push("Education level");

            }


            /* Course */

            if (scholarship.courses.includes(course)) {

                score += 15;

                matchedCriteria.push("Course / stream");

            }


            /* Income */

            if (scholarship.income.includes(income)) {

                score += 25;

                matchedCriteria.push("Income range");

            }


            /* State */

            if (scholarship.states.includes(state)) {

                score += 15;

                matchedCriteria.push("State / domicile");

            }


            /* Caste */

            if (scholarship.caste.includes(caste)) {

                score += 15;

                matchedCriteria.push("Caste category");

            }


            return {

                ...scholarship,

                score,

                matchedCriteria

            };

        });


    /*
        Sort according to matching score
    */

    scoredScholarships.sort(
        (a, b) => b.score - a.score
    );


    /*
        Only show the top 4 suggestions
    */

    const matches =
        scoredScholarships
            .filter(scholarship => scholarship.score >= 40)
            .slice(0, 4);


    /*
        Clear previous results
    */

    results.innerHTML = "";


    /*
        Results heading
    */

    if (matches.length > 0) {

        const heading =
            document.createElement("div");

        heading.innerHTML = `

            <h2 class="results-title">
                🎓 Scholarship Suggestions
            </h2>

            <p>
                Based on the details you entered,
                the following scholarships may be
                relevant to your profile.
            </p>

        `;

        results.appendChild(heading);


        /*
            Display scholarship cards
        */

        matches.forEach(
            (scholarship, index) => {

                const card =
                    document.createElement("article");

                card.className =
                    "card result-card";


                /*
                    Show only the highest useful
                    percentage, not as guaranteed eligibility
                */

                const matchPercentage =
                    Math.min(scholarship.score, 95);


                card.innerHTML = `

                    <div class="icon">
                        🎓
                    </div>


                    <span class="match-badge">
                        ${matchPercentage}% profile match
                    </span>


                    <h3>
                        ${scholarship.name}
                    </h3>


                    <p>
                        ${scholarship.description}
                    </p>


                    <div class="match-info">

                        <strong>
                            Why this may match:
                        </strong>

                        <p>
                            ${scholarship.reason}
                        </p>

                        <p>
                            <strong>
                                Matching factors:
                            </strong>
                            ${scholarship.matchedCriteria.join(", ")}
                        </p>

                    </div>


                    <a class="text-link"
                       href="${scholarship.url}"
                       target="_blank"
                       rel="noopener">

                        View Official Details ↗

                    </a>

                `;


                results.appendChild(card);

            }
        );


        /*
            Important eligibility notice
        */

        const note =
            document.createElement("div");

        note.className =
            "important-note";


        note.innerHTML = `

            <strong>
                ⚠️ Important:
            </strong>

            These suggestions are based only on
            the information you entered and are
            provided for guidance purposes.

            They do not confirm your eligibility.

            Final eligibility, benefits, required
            documents and application dates are
            determined by the respective official
            scholarship scheme.

            Please verify the latest details on
            the official portal before applying.

        `;


        results.appendChild(note);


    } else {


        /*
            No suitable matches
        */

        results.innerHTML = `

            <article class="card no-results">

                <div class="icon">
                    🔎
                </div>

                <h3>
                    No Strong Matches Found
                </h3>

                <p>
                    We could not find a strong match
                    based on the details entered.
                </p>

                <p>
                    You can still explore available
                    schemes through the official
                    scholarship portals below.
                </p>

            </article>

        `;

    }


    /*
        Scroll smoothly to results
    */

    results.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}