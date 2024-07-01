
export const findAll = async () => {
  const leaves = await db.leave.findMany({
    select: {
      id: true,
      reason: true,
      leaveDate: true,
      status: true,
    },
    orderBy: {
      docid: 'desc',
    },
  });

  return leaves;
};
