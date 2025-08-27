export async function POST(req: Request) {
  const body = await req.json();
  const { url } = body as { url: string };

  // Dummy logic
  const dummyTitle = "Breaking News: Example Title from " + url;
  const dummyCaption = `Check out this update: ${dummyTitle}\nRead more at ${url}`;
  const dummyHashtags = "#news #update #breaking #instanews";
  const dummyImage = "https://placehold.co/600x600?text=News+Post";

  return new Response(
    JSON.stringify({
      caption: dummyCaption,
      hashtags: dummyHashtags,
      image: dummyImage,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
