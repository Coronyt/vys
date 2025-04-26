import Link from "next/link";

export default function Navbar() {
    return (
        <div>
            <h2>vys</h2>
            <div>
                <Link href="/">Home</Link>
                <Link href="/">Inspect</Link>
                <Link href="/">New order</Link>
            </div>
        </div>
    );
  }