// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    name: "Atiq Israk Niloy",
    profession: "Software Engineer",
    email: "atiqisrak@gmail.com",
    phone: "+8801701893882",
    address: "Dhaka, Bangladesh",
    linkedin: "https://www.linkedin.com/in/atiqisrak/",
    github: "https://www.github.com/atiqisrak",
  });
}
