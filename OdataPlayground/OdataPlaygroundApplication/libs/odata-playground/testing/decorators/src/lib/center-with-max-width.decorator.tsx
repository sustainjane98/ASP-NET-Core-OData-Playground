export default (classNameWidth: string = 'max-w-[1500px]') =>
  (Story: React.ElementType) =>
    (
      <div className={'flex justify-center items-center h-screen w-screen'}>
        <div className={classNameWidth}>
          <Story />
        </div>
      </div>
    );
