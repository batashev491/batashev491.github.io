export const metadata = {
  title: "Movie Mate",
  description: "To help users discover movies and save their favorite ones for future reference. The app will fetch data from movie-related APIs and allow users to personalize their experience by saving preferences locally.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
