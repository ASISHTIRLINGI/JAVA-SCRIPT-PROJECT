function calculateLove() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (!name1 || !name2) {
        alert('Please enter both names! 💕');
        return;
    }

    // Toggle Visibility
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.querySelector('.calculate-btn').disabled = true;

    // Simulate "Calculation"
    setTimeout(() => {
        const score = getLoveScore(name1, name2);
        displayResult(name1, name2, score);
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.calculate-btn').disabled = false;
    }, 2000);
}

function getLoveScore(name1, name2) {
    let score = 0;
    const combinedNames = (name1 + name2).toLowerCase();
    
    // 1. Length Logic
    const lengthDiff = Math.abs(name1.length - name2.length);
    score += Math.max(0, 100 - lengthDiff * 10);
    
    // 2. Vowel Counting
    const v1 = (name1.match(/[aeiou]/gi) || []).length;
    const v2 = (name2.match(/[aeiou]/gi) || []).length;
    score += Math.min(50, Math.abs(v1 - v2) * 5 + 25);
    
    // 3. Simple Hash
    let hash = 0;
    for (let i = 0; i < combinedNames.length; i++) {
        hash += combinedNames.charCodeAt(i);
    }
    score += (hash % 40);
    
    // 4. Random Element
    score += Math.floor(Math.random() * 15);
    
    return Math.min(99, Math.max(5, Math.floor(score / 5)));
}

function displayResult(name1, name2, score) {
    const result = document.getElementById('result');
    const percentage = document.getElementById('percentage');
    const namesDisplay = document.getElementById('namesDisplay');
    
    namesDisplay.textContent = `${name1} ❤️ ${name2}`;
    percentage.textContent = `${score}%`;
    
    // Animate bars
    const emotional = Math.min(100, Math.floor(score * 0.8 + Math.random() * 20));
    const physical = Math.min(100, Math.floor(score * 0.7 + Math.random() * 25));
    
    document.getElementById('emotionalBar').style.width = `${emotional}%`;
    document.getElementById('physicalBar').style.width = `${physical}%`;
    
    document.getElementById('analysis').innerHTML = getAnalysis(score);
    result.style.display = 'block';
}

function getAnalysis(score) {
    const analyses = {
        90: "🔥 <strong>Perfect Match!</strong> Your love is written in the stars!",
        75: "💖 <strong>Amazing Compatibility!</strong> You two have incredible chemistry.",
        50: "🤝 <strong>Average Match!</strong> Communication is key to making it work!",
        25: "⚠️ <strong>Needs Work!</strong> Challenges ahead, but love conquers all.",
        0: "💔 <strong>Not Recommended!</strong> Plenty of fish in the sea!"
    };
    
    const keys = Object.keys(analyses).sort((a,b) => b-a);
    for (let key of keys) {
        if (score >= key) return analyses[key];
    }
}

function shareResult() {
    const score = document.getElementById('percentage').textContent;
    const text = `I just got a ${score} love score! Check yours out! 💕`;
    
    if (navigator.share) {
        navigator.share({ title: 'Love Score', text: text, url: window.location.href });
    } else {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard! 📋');
    }
}

// Allow Enter key to trigger calculation
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateLove();
});