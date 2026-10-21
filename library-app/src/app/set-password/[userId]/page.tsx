import FormSetPassword from '@/features/(admin)/set-password/components/FormSetPassword';
import { Suspense } from 'react';

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function SetPasswordPage({ params }: Props) {
  const { userId } = await params;
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FormSetPassword userId={userId} />
      </Suspense>
    </>
  );
}
