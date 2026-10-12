/**
 * Generates a semantic similarity matrix for a list of tags.
 * @returns {Map<string, Map<string, number>>} 
 */
function generateSimilarityMatrix() {
    
    const tags = [
        "Artificial Intelligence", "Machine Learning", "Web Development", "Mobile Development", "Data Science", "Cybersecurity",
        "Blockchain", "Cloud Computing", "DevOps", "UI/UX Design", "Product Management", "Digital Marketing", "Entrepreneurship",
        "Startups", "Business Strategy", "Finance", "Sustainability", "Healthcare Tech", "EdTech", "Gaming", "AR/VR", "IoT",
        "Robotics", "Photography", "Writing", "JavaScript", "Python", "Java", "React", "Node.js", "SQL", "MongoDB", "AWS",
        "Docker", "Git", "Figma", "Photoshop", "Excel", "PowerPoint", "Public Speaking", "Leadership", "Project Management",
        "Research", "Data Analysis", "Content Writing", "Social Media", "SEO"
    ];

    const specificScores = new Map();
    const setScore = (tagA, tagB, score) => {
        const key = [tagA, tagB].sort().join('|');
        specificScores.set(key, score);
    };

    setScore("Artificial Intelligence", "Machine Learning", 0.9);
    setScore("Artificial Intelligence", "Data Science", 0.8);
    setScore("Machine Learning", "Data Science", 0.85);
    setScore("Data Science", "Data Analysis", 0.8);
    setScore("UI/UX Design", "Figma", 0.9);
    setScore("Digital Marketing", "SEO", 0.9);
    setScore("Web Development", "JavaScript", 0.8);
    setScore("JavaScript", "React", 0.8);
    setScore("JavaScript", "Node.js", 0.8);
    setScore("Cloud Computing", "AWS", 0.8);
    setScore("DevOps", "Cloud Computing", 0.8);
    setScore("DevOps", "Docker", 0.7);
    setScore("Entrepreneurship", "Startups", 0.8);
    setScore("Photography", "Photoshop", 0.7);

    setScore("SQL", "MongoDB", 0.6); 
    setScore("SQL", "Data Analysis", 0.7);
    setScore("Python", "Data Science", 0.7);
    setScore("Python", "Machine Learning", 0.7);
    setScore("Python", "Web Development", 0.6);
    setScore("UI/UX Design", "Photoshop", 0.6);
    setScore("Digital Marketing", "Social Media", 0.7);
    setScore("Digital Marketing", "Content Writing", 0.6);
    setScore("Writing", "Content Writing", 0.7);
    setScore("Excel", "PowerPoint", 0.7); 
    setScore("Leadership", "Project Management", 0.6);
    setScore("Leadership", "Business Strategy", 0.7);

 
    setScore("Java", "JavaScript", 0.2);

    
    const clusters = {
        ai: ["Artificial Intelligence", "Machine Learning", "Data Science", "Data Analysis", "Research", "Robotics"],
        dev: ["Web Development", "Mobile Development", "JavaScript", "Python", "Java", "React", "Node.js", "SQL", "MongoDB", "Git"],
        cloud: ["Cloud Computing", "DevOps", "AWS", "Docker", "Cybersecurity"],
        design: ["UI/UX Design", "Figma", "Photoshop"],
        business: ["Product Management", "Entrepreneurship", "Startups", "Business Strategy", "Finance", "Leadership", "Project Management", "Public Speaking"],
        marketing: ["Digital Marketing", "Content Writing", "Social Media", "SEO"],
        creative: ["Photography", "Writing", "Gaming", "AR/VR"],
        tech: ["Blockchain", "Sustainability", "Healthcare Tech", "EdTech", "IoT"],
        tools: ["Excel", "PowerPoint"]
    };

    const tagClusterMap = new Map();
    for (const clusterName in clusters) {
        for (const tag of clusters[clusterName]) {
            tagClusterMap.set(tag, clusterName);
        }
    }

    
    const SAME_CLUSTER_SCORE = 0.5;
    const DEFAULT_SCORE = 0.1; 

    // 5. Build the matrix
    const matrix = new Map();
    for (const tagA of tags) {
        const tagBMap = new Map();
        for (const tagB of tags) {
            
            if (tagA === tagB) {
                tagBMap.set(tagB, 1.0);
                continue;
            }

            const sortedKey = [tagA, tagB].sort().join('|');
            if (specificScores.has(sortedKey)) {
                tagBMap.set(tagB, specificScores.get(sortedKey));
                continue;
            }
            const clusterA = tagClusterMap.get(tagA);
            const clusterB = tagClusterMap.get(tagB);
            
            if (clusterA && clusterA === clusterB) {
                tagBMap.set(tagB, SAME_CLUSTER_SCORE);
                continue;
            }

            tagBMap.set(tagB, DEFAULT_SCORE);
        }
        matrix.set(tagA, tagBMap);
    }
    
    return matrix;
}

const similarityMatrix = generateSimilarityMatrix();