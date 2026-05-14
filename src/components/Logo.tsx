import Image from 'next/image'
import clsx from 'clsx'

import notlaLogo from '@/images/notla-logo.png'

type LogoProps = {
  className?: string
}

function LogoImage({ className }: LogoProps) {
  return (
    <Image
      src={notlaLogo}
      alt="Notla"
      priority
      sizes="200px"
      className={clsx('w-auto object-contain dark:invert', className)}
    />
  )
}

export function Logomark(props: LogoProps) {
  return <LogoImage {...props} />
}

export function Logo(props: LogoProps) {
  return <LogoImage {...props} />
}
